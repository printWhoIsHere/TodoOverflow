import { useState, useCallback } from 'react'

import { useSocket } from '@/shared/lib/socket/use-socket'
import { CHANNELS } from '@/shared/constants/socket-channels'

export function useTaskDelete() {
	const { socket } = useSocket()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const deleteTask = useCallback(
		(id: string, callback?: (success: boolean) => void) => {
			if (!socket) return
			setLoading(true)
			setError(null)

			socket.emit(
				CHANNELS.TASK_DELETE,
				id,
				(err?: string | null, payload?: { id: string }) => {
					if (err) {
						setError(err)
						callback?.(false)
					}

					setLoading(false)

					const success = !!(payload && payload.id === id)
					callback?.(success)
				}
			)
		},
		[socket]
	)

	return { deleteTask, loading, error }
}
