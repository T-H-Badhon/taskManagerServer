import { Types } from 'mongoose'

export type TUser = {
  name: string
  email: string
  password: string
  role: 'MANAGER' | 'EMPLOYEE' | 'ADMIN'
}

export type TLoginUser = {
  email: string
  password: string
}

export type TtokenInfo = {
  _id: Types.ObjectId
  email: string
  role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
}
