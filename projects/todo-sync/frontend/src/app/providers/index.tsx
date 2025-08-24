import { SocketProvider } from './socket-provider'

export default function Providers({ children }: { children: React.ReactNode }) {
	return <SocketProvider>{children}</SocketProvider>
}
