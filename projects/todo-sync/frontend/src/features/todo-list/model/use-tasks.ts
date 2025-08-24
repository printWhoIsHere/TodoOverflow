import { useCallback, useEffect, useState } from 'react'

import { useSocket } from '@/shared/lib/socket/use-socket'
import { CHANNELS } from '@/shared/constants/socket-channels'
import type { ApiSchemas, TaskListParams } from '@/shared/api/schema'

import { useTodoConnect } from './use-todo-connect'

export const useTasks = (params: TaskListParams = {}) => {
	const { socket, connected } = useSocket()
	const [tasks, setTasks] = useState<ApiSchemas['Task'][]>([])
	const [stats, setStats] = useState<ApiSchemas['TasksStats']>({
		total: 0,
		completed: 0,
	})

	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	const onList = useCallback((list: ApiSchemas['Task'][]) => {
		setTasks(list)
		setLoading(false)
	}, [])

	const onStats = useCallback((stats: ApiSchemas['TasksStats']) => {
		setStats(stats)
	}, [])

	useTodoConnect(socket, onList, onStats)

	// Запрос списка
	const fetch = useCallback(
		(fetchParams: TaskListParams = {}) => {
			if (!socket) return
			setLoading(true)
			setError(null)

			socket.emit(
				CHANNELS.TASK_LIST,
				fetchParams,
				(error?: string | null, payload?: ApiSchemas['Task'][]) => {
					if (error) setError(error)
					if (payload) setTasks(payload)

					setLoading(false)
				}
			)
		},
		[socket]
	)

	// Первоначальная загрузка только при монтировании
	useEffect(() => {
		if (connected) {
			fetch({ search: params.search, sort: params.sort })
		}
	}, [connected, fetch, params.search, params.sort])

	return {
		tasks,
		stats,
		loading,
		error,
		connected,
		fetch,
		setTasks,
	}
}
