import { useEffect, useMemo, useState } from 'react'

import { SocketContext } from '@/shared/lib/socket/context'
import socketClient from '@/shared/api/socket-client'

export function SocketProvider({ children }: { children: React.ReactNode }) {
	const socket = useMemo(() => socketClient, [])
	const [connected, setConnected] = useState(socket.connected)

	useEffect(() => {
		const onConnect = () => setConnected(true)
		const onDisconnect = () => setConnected(false)
		const onConnectError = (error: Error) => {
			console.warn('[socket] connect_error', error)
		}

		socket.on('connect', onConnect)
		socket.on('disconnect', onDisconnect)
		socket.on('connect_error', onConnectError)

		if (!socket.connected) {
			socket.connect()
		}

		return () => {
			socket.off('connect', onConnect)
			socket.off('disconnect', onDisconnect)
			socket.off('connect_error', onConnectError)

			socket.disconnect()
		}
	}, [socket])

	const connect = () => {
		if (!socket.connected) socket.connect()
	}

	const disconnect = () => {
		if (socket.connected) socket.disconnect()
	}

	return (
		<SocketContext.Provider value={{ socket, connected, connect, disconnect }}>
			{children}
		</SocketContext.Provider>
	)
}
