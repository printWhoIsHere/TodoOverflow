import { useCallback, useState } from 'react'

import type { ApiSchemas } from '@/shared/api/schema'
import { useSocket } from '@/shared/lib/socket/use-socket'

interface CreatePayload {
	text: string
	priority?: ApiSchemas['Task']['priority']
}

export const useTaskCreate = () => {
	const { socket } = useSocket()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const create = useCallback(
		(payload: CreatePayload) => {
			new Promise<ApiSchemas['Task'] | null>((resolve, reject) => {
				if (!socket || !socket.connected) {
					reject(new Error('Socket is not connected'))
					return
				}

				setLoading(true)
				socket.emit(
					'task:create',
					payload,
					(error?: string | null, created?: ApiSchemas['Task']) => {
						setLoading(false)
						if (error) {
							setError(error)
							reject(new Error(error))
							return
						}

						if (created) {
							resolve(created)
						} else {
							resolve(null)
						}
					}
				)
			})
		},
		[socket]
	)

	return { create, loading, error }
}
