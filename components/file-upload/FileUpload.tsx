import { FileUploader } from 'react-drag-drop-files'

import { FileUpload } from '../../types/types'
import UploadButtonContent from './UploadButtonContent'

export default function FileUploadButton({
  header,
  image,
  subText,
  handleChange,
  fileTypes,
  onTypeError,
  onSizeError,
}: FileUpload) {
  return (
    <FileUploader
      handleChange={handleChange}
      types={fileTypes}
      name="coverLogo"
      multiple={false}
      maxSize={5}
      onTypeError={onTypeError}
      onSizeError={onSizeError}
    >
      <UploadButtonContent
        header={header}
        image={image}
        subText={subText}
        fileTypes={fileTypes}
      />
    </FileUploader>
  )
}
