import { useEffect, useState } from 'react'

import { useSocket } from '@/shared/lib/socket/use-socket'
import { CHANNELS } from '@/shared/constants/socket-channels'
import type { ApiSchemas } from '@/shared/api/schema'

export const useUsersData = () => {
	const { socket } = useSocket()

	const [users, setUsers] = useState<ApiSchemas['User'][]>([])
	const [currentUser, setCurrentUser] = useState<ApiSchemas['User'] | null>(
		null
	)
	const [loading, setLoading] = useState(true)
	// const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!socket) return

		const onList = (list: ApiSchemas['User'][]) => {
			setUsers(list)
			setLoading(false)
		}

		const onInfo = (user: ApiSchemas['User']) => {
			setCurrentUser(user)
		}

		socket.on(CHANNELS.USER_LIST, onList)
		socket.on(CHANNELS.USER_INFO, onInfo)

		return () => {
			socket.off(CHANNELS.USER_LIST, onList)
			socket.off(CHANNELS.USER_INFO, onInfo)
		}
	}, [socket])

	return { users, currentUser, loading }
}
