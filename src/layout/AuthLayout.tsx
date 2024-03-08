import * as React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full">
      <section className="bg-black hidden md:w-1/2 md:flex items-center justify-center">
        <div className="animate-bounce px-5 py-3 text-white rounded-xl text-center">
          <p className="text-4xl font-bold">Reynaldi Neo R</p>
          <p className="text-xl font-bold">5025221265</p>
        </div>
      </section>
      <div className=" w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}
