import Button from "@/components/Button";
import SEO from "@/components/Seo";
import Input from "@/components/form/Input";
import { REGEX } from "@/constants/regex";
import Register from "@/hooks/auth/Register";
import AuthLayout from "@/layout/AuthLayout";
import { RegisterType } from "@/types/auth/register";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function RegisterPage() {
  // * ====== React Hook Form ======
  const methods = useForm<RegisterType>();
  const { handleSubmit } = methods;

  // * ====== Hook API ======
  const { mutateRegister, isPending, isSuccess } = Register();
  const router = useRouter();

  // * ====== Handle Submit ======
  const onSubmit: SubmitHandler<RegisterType> = (data) => {
    data.language = "en";
    mutateRegister(data);
    if (isSuccess) router.push("/login");
  };

  return (
    <AuthLayout>
      <SEO title="Register" />
      <div className="space-y-6 w-full px-10 md:px-24">
        <p className="text-3xl font-bold">Register Page</p>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="username"
              label="Username"
              validation={{
                required: "Username is required!",
              }}
            />
            <Input
              id="name"
              label="Name"
              validation={{
                required: "Name is required!",
              }}
            />
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
              Already have an account?
              <Link href="/login">
                <span className="text-blue-500 font-semibold hover:text-blue-800">
                  {" "}
                  Login
                </span>
              </Link>
            </p>
          </form>
        </FormProvider>
      </div>
    </AuthLayout>
  );
}
