import type { ApiChannels } from '../api/schema'

export const CHANNELS = {
	TASK_LIST: 'task:list',
	TASK_STATS: 'task:stats',

	TASK_CREATED: 'task:created',
	TASK_UPDATED: 'task:updated',
	TASK_DELETED: 'task:deleted',

	TASK_CREATE: 'task:create',
	TASK_UPDATE: 'task:update',
	TASK_DELETE: 'task:delete',

	USER_INFO: 'user:info',
	USER_LIST: 'user:list',
} as const satisfies Record<string, keyof ApiChannels>
