import Link from "next/link";

type authProps = {
  children: React.ReactNode;
  header: string;
};

export default function LoginCard({ children, header }: authProps) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="border-2 border-gray-300 rounded-md shadow-lg p-5 bg-white">
        <h1 className="text-3xl font-medium text-center text-black">
          {header}
        </h1>
        <div className="flex justify-center p-10 mb-5 rounded-md bg-white">
          {children}
        </div>
      </div>
    </div>
  );
}
