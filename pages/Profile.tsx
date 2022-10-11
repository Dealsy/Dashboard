import { useState } from 'react'

import FileUploadButton from '../components/file-upload/FileUpload'
import Input from '../components/reuseable_components/Input'
import { useUser } from '../hooks/UseUser'

export default function Profile() {
  const user = useUser()
  const fileSize = '5MB'
  const fileTypes = ['JPG', 'PNG', 'SVG']
  // Use this to display error with types
  const fileTypeError = fileTypes.join(', ')
  const sizeError = `File size cannot be bigger than ${fileSize}`

  const [logo, setLogo] = useState<File | null>(null)
  const [logoSizeError, setLogoSizeError] = useState(false)
  const [logoError, setLogoError] = useState(false)

  const handleChange = (logo: any) => {}

  return (
    <div>
      <h1 className="text-center mt-5 text-5xl">Profile</h1>
      <div className="flex  p-20">
        <div className="flex flex-row-reverse flex-grow">
          <div className="flex flex-col w-1/2">
            <FileUploadButton
              onTypeError={setLogoError}
              onSizeError={setLogoSizeError}
              fileTypes={fileTypes}
              handleChange={setLogo}
              header="Profile picture"
              subText="Image to be at 8:1 ratio no larger than 800px wide"
              image="/images/Path.png"
              fileSize={fileSize}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="ml-2" htmlFor="dashboardName">
              Dashboard name
            </label>
            <Input
              id="dashboardName"
              placeholder="User Dashboard.."
              name="dashboardName"
              onChange={() => {}}
              className="w-104"
            />
            <label className="ml-2" htmlFor="userName">
              Username
            </label>
            <Input
              id="userName"
              name="Username"
              onChange={() => {}}
              value={user?.username}
              className="w-104"
            />
            <label className="ml-2" htmlFor="lastName">
              Email
            </label>
            <Input
              type="email"
              id="lastName"
              name="lastName"
              onChange={() => {}}
              value={user?.email}
              className="w-104"
            />
            <label className="ml-2" htmlFor="Password">
              Update password
            </label>
            <Input
              type="password"
              id="Password"
              name="Password"
              onChange={() => {}}
              className="w-104"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
