import { DocumentArrowDownIcon } from '@heroicons/react/24/outline/'
import clsx from 'clsx'

type UploadContent = {
  header: string
  image: string
  subText: string
  fileTypes: string[]
}

export default function UploadButtonContent({
  header,
  subText,
  fileTypes,
}: UploadContent) {
  return (
    <>
      <div className="flex flex-row justify-between w-full"></div>
      {/* This button is specific for this component only. */}
      <button
        type="button"
        className={clsx(
          'relative block border-2 border-gray-300 border-dashed',
          'rounded-full p-12 text-center hover:border-gray-400 h-96',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
        )}
      >
        <label className="text-xl font-medium text-gray-700 mt-5 flex justify-center mb-10">
          {header}
        </label>
        <DocumentArrowDownIcon className="h-5 w-5 mx-auto" />
        <div className="flex flex-row justify-center mt-2">
          <label
            className={clsx(
              'block text-sm font-medium text-indigo-600 mr-1',
              'hover:underline'
            )}
          >
            Upload a file
          </label>
          <label className="block text-sm font-medium text-gray-900">
            or drag and drop
          </label>
        </div>
        <span className="text-gray-500 text-sm">{subText}</span>
        <br />
        <span className="text-gray-500 text-sm">Supported file types:</span>
        {fileTypes.map((types, index) => {
          return (
            <span key={index} className="text-gray-500 text-sm mr-1 ml-1">
              {types}
            </span>
          )
        })}
      </button>
    </>
  )
}
