import { User } from '../modules/users/users.model'
import { hashedPassword } from './hashedPassword'

export const seedAdmin = async () => {
  const admin = await User.findOne({ role: 'ADMIN' })

  if (admin) {
    return
  }
  const adminData = {
    name: 'Tanvir Hasan',
    email: 'thbadhons@gmail.com',
    password: await hashedPassword('password123'),
    role: 'ADMIN',
  }

  await User.create(adminData)
}
