import clsx from "clsx";

type AuthInputProps = {
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name?: string;
};

export default function AuthInput({
  type,
  value,
  onChange,
  placeholder,
  name,
}: AuthInputProps) {
  return (
    <div className="flex flex-row w-full">
      <input
        className={clsx(
          "border-2 border-gray-200 rounded-md ml-2 mb-2 w-64 p-2 border-t-0 border-x-0 placeholder-gray-400",
          "focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        )}
        type={type || "text"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  );
}
