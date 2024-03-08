import { useRouter } from "next/navigation";
import * as React from "react";

import Loading from "@/components/Loading";
import api from "@/libs/api";
import { getToken } from "@/libs/cookies";
import useAuthStore from "@/stores/useAuthStore";
import { toast } from "sonner";
import { User } from "@/types/auth/login";

type UserGetType = {
  resultMessage: {
    en: string;
  };
  resultCode: string;
  user: {
    _id: string;
    email: string;
    username: string;
    name: string;
    type: string;
    language: string;
    photoUrl: string;
    isVerified: boolean;
    countryCode: string;
    tasks: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
};

async function getUser() {
  const res = await api.get<UserGetType>("/user");
  return res.data.user;
}

type WithAuthProps = {
  user: User;
};

export default function withAuth<T>(Component: React.ComponentType<T>) {
  function ComponentWithAuth(props: Omit<T, keyof WithAuthProps>) {
    const router = useRouter();

    const { user, isAuthed, isLoading, login, logout, stopLoading } =
      useAuthStore();

    const checkAuth = React.useCallback(async () => {
      const token = getToken();
      if (!token) {
        isAuthed && logout();
        stopLoading();
        return;
      }

      if (isAuthed) {
        stopLoading();
        return;
      }

      try {
        const newUser = await getUser();
        login({ ...newUser, accessToken: token });
      } catch {
        logout();
      } finally {
        stopLoading();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed]);

    React.useEffect(() => {
      if (isLoading) {
        return;
      }

      if (!isAuthed) {
        toast.error("Anda tidak memiliki akses ke halaman ini");
        router.replace("/login");
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthed, isLoading]);

    React.useEffect(() => {
      checkAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isLoading) return <Loading />;
    else if (!isLoading && !isAuthed) {
      router.replace("/login");
      return;
    }
    return <Component {...(props as T)} user={user} />;
  }

  return ComponentWithAuth;
}
