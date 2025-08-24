import http from 'http'
import { Server as IOServer } from 'socket.io'

import { loggers } from '@/utils/logger'
import { TaskStore, UserStore } from '@/store'
import { TaskService } from '@/services/task.service'
import { seedMockTasks } from '@/utils/seed-mock'
import registerUserEvents from '@/api/user-events'
import registerTaskEvents from '@/api/task-events'

export function initSocketServer(server: http.Server) {
	const io = new IOServer(server, {
		cors: {
			origin: true,
			credentials: true,
		},
	})

	const userStore = new UserStore()
	const taskStore = new TaskStore()
	const taskService = new TaskService(taskStore)

	seedMockTasks(taskService)

	io.on('connection', (socket) => {
		const id = socket.id
		loggers.socket.info(`Client connected: ${id}`)

		registerUserEvents(io, socket, userStore, taskService)
		registerTaskEvents(io, socket, taskService)

		socket.on('disconnect', (reason) => {
			loggers.socket.info(`Client disconnected: ${id} — (${reason})`)
		})

		socket.on('error', (error) => {
			loggers.socket.warn(`Socket error: ${id} (${error})`)
		})
	})

	return { io, userStore, taskStore, taskService }
}
