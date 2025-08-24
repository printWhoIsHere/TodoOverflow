import { createContext } from 'react'
import type { Socket } from 'socket.io-client'

export type SocketContextValue = {
	socket: Socket
	connected: boolean
	connect: () => void
	disconnect: () => void
}

export const SocketContext = createContext<SocketContextValue | undefined>(
	undefined
)
