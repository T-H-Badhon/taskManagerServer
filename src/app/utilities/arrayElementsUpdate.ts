import { Types } from 'mongoose'
import {
  TRequestDependency,
  TRequestfile,
} from '../modules/task/task.interface'

export const dependencyUpdateManager = (
  requestedArray: TRequestDependency[],
  currentElements: Types.ObjectId[],
) => {
  const deletedElements = requestedArray.map((element) => {
    if (element.isDeleted) {
      return element.taskId
    }
  })

  const addedElements = requestedArray.map((element) => {
    if (!element.isDeleted) {
      return element.taskId
    }
  })

  const newElements = currentElements?.filter((element) => {
    if (!deletedElements.includes(element)) {
      return element
    }
  })

  for (const element of addedElements) {
    if (element && !newElements.includes(element)) {
      newElements.push(element)
    }
  }

  return newElements
}
export const attachedFilesUpdateManager = (
  requestedArray: TRequestfile[],
  currentElements: string[],
) => {
  const deletedElements = requestedArray.map((element) => {
    if (element.isDeleted) {
      return element.fileLink
    }
  })

  const addedElements = requestedArray.map((element) => {
    if (!element.isDeleted) {
      return element.fileLink
    }
  })

  const newElements = currentElements?.filter((element) => {
    if (!deletedElements.includes(element)) {
      return element
    }
  })

  for (const element of addedElements) {
    if (element && !newElements.includes(element)) {
      newElements.push(element)
    }
  }

  return newElements
}
