import clsx from 'clsx'

type InputProps = {
  type?: string
  value?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  name?: string
  id?: string
  className?: string
}

export default function Input({
  type,
  value,
  onChange,
  placeholder,
  name,
  id,
  className,
}: InputProps) {
  return (
    <div className="flex flex-row w-full">
      <input
        id={id}
        className={clsx(
          'border-2 border-gray-500 border-t-0 border-x-0 rounded-md ml-2 mb-2 w-1/2 p-2  placeholder-gray-400',
          'focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500',
          className
        )}
        type={type || 'text'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
      />
    </div>
  )
}
