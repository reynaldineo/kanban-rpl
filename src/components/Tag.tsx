export default function Tag({ title }: { title: string }) {
  return (
    <div className="bg-violet-400 w-fit rounded-2xl px-2.5 py-1 text-sm mt-2">
      {title}
    </div>
  );
}
