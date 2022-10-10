import clsx from "clsx";

export default function PageLoader() {
  return (
    <div className="fixed inset-0 flex w-full h-screen items-center justify-center">
      <div
        className={clsx(
          "w-12 h-12 border-[0.3rem] animate-spin rounded-full",
          "border-darkGray border-r-purple-600 rotate"
        )}
      />
    </div>
  );
}
