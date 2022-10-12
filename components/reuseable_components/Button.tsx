import clsx from 'clsx'

type buttonProps = {
  text: string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  href?: string
  RightImage?: any
  LeftImage?: any
}

export default function Button({
  text,
  className,
  onClick,
  type,
  RightImage,
  LeftImage,
}: buttonProps) {
  return (
    <a>
      <button
        className={clsx('text-center p-2 rounded-md', className)}
        type={type || 'submit'}
        onClick={onClick}
      >
        <div className="flex flex-row">
          {RightImage && <RightImage className="w-6 h-6 mr-2" />}
          <span>{text}</span>
          {LeftImage && <LeftImage className="w-6 h-6  ml-2" />}
        </div>
      </button>
    </a>
  )
}
