import clsx from "clsx";

type buttonProps = {
  text: string;
  className?: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
  text,
  className,
  onClick,
  type,
}: buttonProps) {
  return (
    <button
      className={clsx("text-center p-2 rounded-md", className)}
      type={type || "submit"}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
