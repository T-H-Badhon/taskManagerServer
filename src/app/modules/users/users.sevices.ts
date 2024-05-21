import httpStatus from 'http-status'
import { config } from '../../config/config'
import { AppError } from '../../errors/AppError'
import { hashedPassword } from '../../utilities/hashedPassword'
import { matchPassword } from '../../utilities/matchPassword'
import { TLoginUser, TUser, TtokenInfo } from './users.interfaces'
import { User } from './users.model'
import jwt from 'jsonwebtoken'

const registerUser = async (userData: TUser) => {
  userData.password = await hashedPassword(userData.password)

  const user = await User.create(userData)

  const result = await User.findById(user._id).select('-password -__v ')

  return result
}

const loginUser = async (loginCredential: TLoginUser) => {
  const { email, password } = loginCredential

  const loginUser = await User.findOne({ email }).select('+password')

  if (loginUser) {
    const isMatched = await matchPassword(password, loginUser.password)

    if (!isMatched) {
      throw new AppError(httpStatus.FORBIDDEN, 'password not matched')
    }

    const tokenInfo: TtokenInfo = {
      _id: loginUser._id,
      role: loginUser.role,
      email: loginUser.email,
    }
    const token = jwt.sign(tokenInfo, config.access_secrate as string, {
      expiresIn: '10h',
    })

    const result = {
      token,
    }

    return result
  } else {
    throw new AppError(httpStatus.NOT_FOUND, 'user not found')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const allUsers = async (query: any) => {
  let filter = {}
  if (query?.searchTerm) {
    filter = {
      name: { $regex: query.searchTerm, $options: 'i' },
      speciality: { $regex: query.searchTerm, $options: 'i' },
    }
  }
  const users = await User.find(filter).select('-password')

  return users
}

const oneUser = async (id: string) => {
  const user = await User.findById({ _id: id }).select('-password')

  return user
}

const deleteUser = async (id: string) => {
  const user = await User.findOneAndDelete({ _id: id })

  return user
}

export const userServices = {
  registerUser,
  loginUser,
  allUsers,
  oneUser,
  deleteUser,
}
