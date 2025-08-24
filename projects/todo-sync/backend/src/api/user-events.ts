import { v4 as uuid } from 'uuid'
import type { Server, Socket } from 'socket.io'

import { loggers } from '@/utils/logger'
import { generateUser } from '@/utils/generate-user'
import type { UserStore } from '@/store'
import type { TaskService } from '@/services/task.service'
import type { ApiChannels, ApiSchemas } from '@/types'

export const CHANNELS = {
	USER_LIST: 'user:list',
	USER_INFO: 'user:info',
	TASK_LIST: 'task:list',
	TASK_STATS: 'task:stats',
} as const satisfies Record<string, keyof ApiChannels>

export default function registerUserEvents(
	io: Server,
	socket: Socket,
	userStore: UserStore,
	taskService: TaskService
) {
	// Создаём пользователя и сохраняем в store
	const user: ApiSchemas['User'] = generateUser(uuid(), socket.id)
	userStore.add(user)

	// Отправляем клиенту его информацию и начальные данные
	socket.emit(CHANNELS.USER_INFO, user)
	socket.emit(CHANNELS.TASK_LIST, taskService.list())
	socket.emit(CHANNELS.TASK_STATS, taskService.stats())

	// Оповещаем всех клиентов об обновлённом списке пользователей
	io.emit(CHANNELS.USER_LIST, userStore.list())

	// При disconnect - удаляем пользователя и оповещаем всех
	socket.on('disconnect', (reason) => {
		userStore.removeBySocket(socket.id)

		// Отсылаем обновлённый список пользователей
		io.emit(CHANNELS.USER_LIST, userStore.list())

		loggers.api.info(`User disconnected: ${socket.id} — (${reason})`)
	})

	socket.on('error', (error) => {
		loggers.api.warn(`Socket error [user-events]: ${socket.id}`, error)
	})
}
