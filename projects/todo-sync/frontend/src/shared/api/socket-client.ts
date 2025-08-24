import { io, type Socket } from 'socket.io-client'
import { CONFIG } from '@/shared/model/config'

function createSocket(): Socket {
	const endpoint = CONFIG.SOCKET_ENDPOINT

	// Если endpoint начинается с '/',
	// то подключаемся к текущему origin и задаём path
	if (endpoint && endpoint.startsWith('/')) {
		return io(undefined, {
			autoConnect: false,
			withCredentials: true,
			path: endpoint, // '/socket.io'
			transports: ['polling', 'websocket'],
		})
	}

	// иначе — ожидаем полный URL (http://<LAN_IP>:3000)
	return io(endpoint ?? `http://${window.location.hostname}:3000`, {
		autoConnect: false,
		withCredentials: true,
		transports: ['polling', 'websocket'],
	})
}

const socket = createSocket()
export default socket
