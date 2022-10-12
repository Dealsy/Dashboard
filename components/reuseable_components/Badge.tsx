type badgeProps = {
  className: string
  text: string
  RightImage?: any
  LeftImage?: any
}

export default function Badge({
  className,
  text,
  RightImage,
  LeftImage,
}: badgeProps) {
  return (
    <div className={className}>
      {RightImage && <RightImage className="w-4 h-4 mr-2" />}
      <span>{text}</span>
      {LeftImage && <LeftImage className="w-4 h-4  ml-2" />}
    </div>
  )
}
