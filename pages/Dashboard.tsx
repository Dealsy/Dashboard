import Card from '../components/dashboard/Card'
import PageLoader from '../components/loaders/pageLoader'
import { UserRoles } from '../helpers/UserRoles'
import { useUser } from '../hooks/UseUser'

export default function Dashboard() {
  const user = useUser()

  if (!user) {
    return <PageLoader />
  }

  return (
    <div className="flex flex-wrap flex-row justify-between m-10">
      <Card className="bg-green-500 p-3" header="Personal Details">
        <div className="flex flex-col">
          <h3 className="flex justify-center font-medium text-xl">Details:</h3>
          <ul>
            <li>Username: {user.username}</li>
            <li>Email: {user.email}</li>
          </ul>
          <h3 className="flex justify-center font-medium mt-2 text-xl">
            Roles:
          </h3>
          <UserRoles />
        </div>
      </Card>
    </div>
  )
}
