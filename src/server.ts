import mongoose from 'mongoose'
import app from './app'
import { config } from './app/config/config'
import { Server } from 'http'
import { seedAdmin } from './app/utilities/seedAdmin'

let server: Server

function main() {
  mongoose.connect(config.db_url as string)

  server = app.listen(config.port, () => {
    console.log(`app listening on port ${config.port}`)
  })
  seedAdmin()
}

main()

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is detected. shuting down...')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is detected. shutting down ...')
  process.exit(1)
})
