/* eslint-disable @typescript-eslint/no-explicit-any */
import { Task } from './task.model'
import { TRequestDependency, TRequestfile, TTask } from './task.interface'
import {
  attachedFilesUpdateManager,
  dependencyUpdateManager,
} from '../../utilities/arrayElementsUpdate'
import { queryFilter } from '../../middlewares/queryBuilder'
import { AppError } from '../../errors/AppError'
import httpStatus from 'http-status'
import { Types } from 'mongoose'

const addTask = async (payload: any) => {
  const { reqDependencies, reqFiles, ...taskData } = payload

  taskData.dueDate = new Date(taskData.dueDate)

  const dependencies: string[] = reqDependencies?.map(
    (dependency: TRequestDependency) => {
      return dependency.taskId
    },
  )

  const files: string[] = reqFiles?.map((file: TRequestfile) => {
    return file.fileLink
  })

  const result = await Task.create({
    taskDependencies: dependencies,
    attachedFiles: files,
    ...taskData,
  })

  return result
}

const allTasks = async (query: Record<string, unknown>) => {
  const filter = queryFilter(query)
  const result = await Task.find(filter)

  return result
}

const oneTask = async (id: string) => {
  const result = await Task.findById({ _id: id })

  return result
}

const myTasks = async (id: string, query: Record<string, unknown>) => {
  const filter = queryFilter(query)
  const result = await Task.find({ createdby: id, ...filter })

  return result
}

const updateTask = async (
  userId: Types.ObjectId,
  taskId: string,
  payload: any,
) => {
  const { comments, reqDependencies, reqFiles, ...updateData } = payload

  const updateTask: Partial<TTask> = { ...updateData }

  const currentTask = await Task.findById({ _id: taskId })

  if (currentTask && currentTask?.categoryId != userId) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'you are not authorized to update this task',
    )
  }

  if (comments && comments.length > 0) {
    for (const comment of comments) {
      currentTask?.comments.unshift(comment)
    }

    updateTask.comments = currentTask?.comments as string[]
  }

  if (reqDependencies && reqDependencies.length > 0) {
    const dependencies = dependencyUpdateManager(
      reqDependencies,
      currentTask?.taskDependencies as string[],
    )

    updateTask.taskDependencies = dependencies as string[]
  }

  if (reqFiles && reqFiles.length > 0) {
    const newFiles = attachedFilesUpdateManager(
      reqFiles,
      currentTask?.attachedFiles as string[],
    )

    updateTask.attachedFiles = newFiles
  }

  const result = await Task.findByIdAndUpdate({ _id: taskId }, updateTask, {
    new: true,
  })

  return result
}

const deleteTask = async (userId: string, taskId: string) => {
  const result = await Task.findOneAndDelete({ _id: taskId, createdby: userId })

  console.log(result)

  return result
}

export const taskServices = {
  addTask,
  allTasks,
  oneTask,
  myTasks,
  updateTask,
  deleteTask,
}
