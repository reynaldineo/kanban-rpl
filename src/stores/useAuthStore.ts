import { produce } from "immer";
import { create } from "zustand";

import { removeToken } from "@/libs/cookies";
import { LoginResponseType } from "@/types/auth";

interface AuthState {
  user: LoginResponseType | null;
  isAuthed: boolean;
  isLoading: boolean;
}

interface AuthAction {
  login: (user: LoginResponseType) => void;
  logout: () => void;
  stopLoading: () => void;
}

const useAuthStore = create<AuthState & AuthAction>((set) => ({
  user: null,
  isAuthed: false,
  isLoading: true,
  login: (user) => {
    set(
      produce<AuthState>((state) => {
        state.user = user;
        state.isAuthed = true;
      })
    );
  },
  logout: () => {
    removeToken();
    set(
      produce<AuthState>((state) => {
        state.user = null;
        state.isAuthed = false;
      })
    );
  },
  stopLoading: () =>
    set(
      produce<AuthState>((state) => {
        state.isLoading = false;
      })
    ),
}));

export default useAuthStore;
