import type { Server, Socket } from 'socket.io'

import { loggers } from '@/utils/logger'
import { TaskService } from '@/services/task.service'
import type { ApiChannels, ApiSchemas, TaskListParams } from '@/types'

export const CHANNELS = {
	TASK_LIST: 'task:list',
	TASK_STATS: 'task:stats',

	TASK_CREATED: 'task:created',
	TASK_UPDATED: 'task:updated',
	TASK_DELETED: 'task:deleted',

	TASK_CREATE: 'task:create',
	TASK_UPDATE: 'task:update',
	TASK_DELETE: 'task:delete',
} as const satisfies Record<string, keyof ApiChannels>

type Ack<T = any> = (err?: string | null, payload?: T) => void

function broadcastTaskListToSockets(io: Server, taskService: TaskService) {
	io.sockets.sockets.forEach((s) => {
		const params: TaskListParams =
			(s.data && (s.data.taskQuery as TaskListParams)) ?? {}
		try {
			const list = taskService.list(params)
			s.emit(CHANNELS.TASK_LIST, list)
		} catch (err) {
			loggers.api.error(
				'[broadcastTaskListToSockets] failed for socket',
				s.id,
				err
			)
		}
	})
}

export default function registerTaskEvents(
	io: Server,
	socket: Socket,
	taskService: TaskService
) {
	socket.on(
		CHANNELS.TASK_LIST,
		(params: TaskListParams = {}, ack?: Ack<ApiSchemas['Task'][]>) => {
			try {
				// Сохраняем параметры у сокета
				socket.data.taskQuery = params
				const list = taskService.list(params)
				ack?.(null, list)

				socket.emit(CHANNELS.TASK_STATS, taskService.stats())
			} catch (error) {
				loggers.api.error(`[task-events] ${CHANNELS.TASK_LIST} error`, error)
				ack?.('list_failed')
			}
		}
	)

	// Создание
	socket.on(
		CHANNELS.TASK_CREATE,
		(
			payload: Omit<ApiSchemas['Task'], 'id' | 'createdAt' | 'updatedAt'>,
			ack?: Ack<ApiSchemas['Task']>
		) => {
			try {
				const task = taskService.create(payload)

				// Оповещаем всех о новой задаче
				io.emit(CHANNELS.TASK_CREATED, task)

				// Обновляем у всех клиентов
				broadcastTaskListToSockets(io, taskService)

				// Статистика (глобальная)
				io.emit(CHANNELS.TASK_STATS, taskService.stats())

				ack?.(null, task)
			} catch (error) {
				loggers.api.error(`[task-events] ${CHANNELS.TASK_CREATE} error`, error)
				ack?.('create_failed')
				socket.emit('error', { message: 'Task creation failed' })
			}
		}
	)

	// Обновление
	socket.on(
		CHANNELS.TASK_UPDATE,
		(
			payload: Partial<
				Pick<ApiSchemas['Task'], 'text' | 'completed' | 'priority'>
			> & {
				id: string
			},
			ack?: Ack<ApiSchemas['Task']>
		) => {
			try {
				const { id, ...patch } = payload
				const updated = taskService.update(id, patch)
				if (!updated) {
					ack?.('not_found')
					return
				}

				// Оповещаем остальных об обновлении конкретной задачи
				socket.broadcast.emit(CHANNELS.TASK_UPDATED, updated)

				// Обновляем у всех клиентов
				broadcastTaskListToSockets(io, taskService)

				// Обновляем статистику глобально
				io.emit(CHANNELS.TASK_STATS, taskService.stats())

				ack?.(null, updated)
			} catch (error) {
				loggers.api.error(`[task-events] ${CHANNELS.TASK_UPDATE} error`, error)
				ack?.('update_failed')
				socket.emit('error', { message: 'Task update failed' })
			}
		}
	)

	// Удаление
	socket.on(CHANNELS.TASK_DELETE, (id: string, ack?: Ack<{ id: string }>) => {
		try {
			const deleted = taskService.delete(id)
			if (!deleted) {
				ack?.('not_found')
				return
			}

			// Оповещаем остальных об обновлении конкретной задачи
			socket.broadcast.emit(CHANNELS.TASK_UPDATED, id)

			// Обновляем у всех клиентов
			broadcastTaskListToSockets(io, taskService)

			// Обновляем статистику глобально
			io.emit(CHANNELS.TASK_STATS, taskService.stats())

			ack?.(null, { id })
		} catch (error) {
			loggers.api.error(`[task-events] ${CHANNELS.TASK_DELETE} error`, error)

			ack?.('delete_failed')
			socket.emit('error', { message: 'Task delete failed' })
		}
	})

	socket.on('error', (error) => {
		loggers.api.warn(`Socket error [task-events]: ${socket.id}`, error)
	})
}
