import { authMiddleware } from '@/lib/auth';
import { UsersTable }from '../../components/users-table'
import { getUsers } from '@/app/actions/users-actions';

export default async function UsersPage() {
  await authMiddleware();
  const users = await getUsers();

  return (
    <div className="container mx-auto py-[100px]">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <UsersTable users={users}/>
        </div>
      </div>
    </div>
  )
}

