import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full">
      <section className="bg-zinc-900 hidden md:w-1/2 md:flex items-center justify-center text-white">
        LOGO
      </section>
      <div className=" w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
