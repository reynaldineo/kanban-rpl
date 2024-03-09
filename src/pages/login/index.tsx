import Button from "@/components/Button";
import SEO from "@/components/Seo";
import Input from "@/components/form/Input";
import { REGEX } from "@/constants/regex";
import Login from "@/hooks/auth/Login";
import AuthLayout from "@/layout/AuthLayout";
import { LoginType } from "@/types/auth/login";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function LoginPage() {
  // * ====== React Hook Form ======
  const methods = useForm<LoginType>();
  const { handleSubmit } = methods;

  // * ====== Hook API ======
  const { mutateLogin, isPending } = Login();

  // * ====== Handle Submit ======
  const onSubmit: SubmitHandler<LoginType> = (data) => {
    mutateLogin(data);
  };

  return (
    <main className="flex min-h-screen w-full">
      <section className="bg-black hidden md:w-1/2 md:flex items-center justify-center">
        <div className="animate-bounce px-5 py-3 text-white rounded-xl text-center">
          <p className="text-4xl font-bold">Reynaldi Neo R</p>
          <p className="text-xl font-bold">5025221265</p>
        </div>
      </section>
      <div className=" w-full md:w-1/2 flex items-center justify-center">
        <SEO title="Login" />
        <div className="space-y-6 w-full px-10 md:px-24">
          <p className="text-3xl font-bold">Login Page</p>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                id="email"
                label="Email"
                validation={{
                  required: "Email is required!",
                  pattern: {
                    value: REGEX.EMAIL,
                    message: "Please enter a valid email address.",
                  },
                }}
              />
              <Input
                id="password"
                label="Password"
                type="password"
                validation={{
                  required: "Password is required!",
                  pattern: {
                    value: REGEX.PASSWORD,
                    message:
                      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one digit.",
                  },
                }}
              />
              <Button type="submit" className="w-full" isLoading={isPending}>
                Submit
              </Button>
              <p>
                Don&apos;t have an account?
                <Link href="/register">
                  <span className="text-blue-500 font-semibold hover:text-blue-800">
                    {" "}
                    Create Account
                  </span>
                </Link>
              </p>
            </form>
          </FormProvider>
        </div>
      </div>
    </main>
  );
}
