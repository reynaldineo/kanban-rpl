import clsxm from "@/libs/clxsm";

export default function SkeletonBoard() {
  return (
    <div
      className={clsxm(
        "animate-pulse bg-gray-400 rounded-xl flex flex-col gap-4 ",
        " w-full min-w-[300px] h-full min-h-[60vh]",
        "mt-4 p-4 pb-10"
      )}
    />
  );
}
