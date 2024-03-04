import Link from "next/link";

export default function Navbar() {
  return (
    <section className="flex w-full justify-between bg-gray-950 py-3.5 px-5 text-white">
      <Link href="/">
        <div className=" font-bold">ReynaldiNeo</div>
      </Link>
      <Link href="/">
        <div>Login</div>
      </Link>
    </section>
  );
}
