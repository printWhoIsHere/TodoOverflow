import { useEffect } from 'react'
import type { Socket } from 'socket.io-client'

import { CHANNELS } from '@/shared/constants/socket-channels'
import type { ApiSchemas } from '@/shared/api/schema'

export function useTodoConnect(
	socket: Socket | null | undefined,
	onList?: (list: ApiSchemas['Task'][]) => void,
	onStats?: (stats: ApiSchemas['TasksStats']) => void
) {
	useEffect(() => {
		if (!socket) return

		if (onList) socket.on(CHANNELS.TASK_LIST, onList)
		if (onStats) socket.on(CHANNELS.TASK_STATS, onStats)

		return () => {
			if (onList) socket.off(CHANNELS.TASK_LIST, onList)
			if (onStats) socket.off(CHANNELS.TASK_STATS, onStats)
		}
	}, [socket, onList, onStats])
}
