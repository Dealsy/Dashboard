import clsx from "clsx";
import Link from "next/link";

type authLinkProps = {
  linkText: string;
  hrefPath: string;
  text?: string;
  className?: string;
};

export default function AuthLink({
  text,
  linkText,
  hrefPath,
  className,
}: authLinkProps) {
  return (
    <div
      className={clsx("ml-1 text-indigo-400 flex flex-row text-sm", className)}
    >
      <p className="text-black mr-1"> {text}</p>
      <Link href={`/login/${hrefPath}`}>{linkText}</Link>
    </div>
  );
}
