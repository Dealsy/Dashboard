export type FileUpload = {
  header: string
  image: string
  rightTitle?: string
  subText: string
  logo?: File | null
  fileSize: string
  fileTypes: string[]
  onTypeError: React.Dispatch<React.SetStateAction<boolean>>
  onSizeError: React.Dispatch<React.SetStateAction<boolean>>
  handleChange: (file: File | null) => void
}

export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly color: string
  readonly isFixed?: boolean
  readonly isDisabled?: boolean
}
