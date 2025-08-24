import type { TaskListParams } from '@/types'

declare module 'socket.io' {
	interface Socket {
		data: {
			taskQuery?: TaskListParams
			[k: string]: any
		}
	}
}
