import clsx from 'clsx'
import Link from 'next/link'

type buttonProps = {
  text: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  href?: string
}

export default function Button({
  text,
  className,
  onClick,
  type,
  href,
}: buttonProps) {
  return (
    <Link href={`/${href}`}>
      <a>
        <button
          className={clsx('text-center p-2 rounded-md', className)}
          type={type || 'submit'}
          onClick={onClick}
        >
          {text}
        </button>
      </a>
    </Link>
  )
}
