interface components {
	schemas: {
		Task: {
			id: string
			text: string
			completed: boolean
			priority: 'high' | 'medium' | 'low'
			createdAt: string
			updatedAt?: string | null
		}

		TasksStats: {
			total: number
			completed: number
		}

		User: {
			id: string
			socketId: string
			username: string
			avatar?: string
		}
	}
}

interface channels {
	'task:list': {
		subscribe: components['schemas']['Task'][]
	}
	'task:stats': {
		subscribe: components['schemas']['TasksStats']
	}

	'task:created': {
		subscribe: components['schemas']['Task']
	}
	'task:updated': {
		subscribe: components['schemas']['Task']
	}
	'task:deleted': {
		subscribe: components['schemas']['Task']['id']
	}

	'task:create': {
		publish: Omit<
			components['schemas']['Task'],
			'id' | 'createdAt' | 'updatedAt'
		>
	}
	'task:update': {
		publish: Partial<
			Pick<components['schemas']['Task'], 'text' | 'completed' | 'priority'>
		> &
			Pick<components['schemas']['Task'], 'id'>
	}
	'task:delete': {
		publish: components['schemas']['Task']['id']
	}

	'user:list': {
		subscribe: components['schemas']['User'][]
	}
	'user:info': {
		subscribe: components['schemas']['User']
	}
}

export type ApiSchemas = components['schemas']
export type ApiChannels = channels

export type TaskListParams = {
	search?: string
	sort?: keyof Pick<ApiSchemas['Task'], 'createdAt' | 'completed' | 'priority'>
}
