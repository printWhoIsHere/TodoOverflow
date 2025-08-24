// src/features/todo-list/model/use-task-update.ts
import { useState, useCallback } from 'react'
import type { ApiSchemas } from '@/shared/api/schema'
import { useSocket } from '@/shared/lib/socket/use-socket'
import { CHANNELS } from '@/shared/constants/socket-channels'

export function useTaskUpdate() {
	const { socket } = useSocket()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const updateTask = useCallback(
		(
			id: string,
			updates: Partial<
				Pick<ApiSchemas['Task'], 'text' | 'completed' | 'priority'>
			>,
			callback?: (updated?: ApiSchemas['Task']) => void
		) => {
			if (!socket) return
			setLoading(true)
			setError(null)

			socket.emit(
				CHANNELS.TASK_UPDATE,
				{ id, ...updates },
				(err?: string | null, updated?: ApiSchemas['Task']) => {
					if (err) {
						setError(err)
						callback?.(undefined)
					} else {
						callback?.(updated)
					}
					setLoading(false)
				}
			)
		},
		[socket]
	)

	return { updateTask, loading, error }
}
