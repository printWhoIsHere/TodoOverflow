import { v4 as uuid } from 'uuid'

import { TaskStore } from '@/store'
import type { ApiSchemas, TaskListParams } from '@/types'

export class TaskService {
	constructor(private store: TaskStore) {}

	create(payload: Omit<ApiSchemas['Task'], 'id' | 'createdAt' | 'updatedAt'>) {
		const task: ApiSchemas['Task'] = {
			id: uuid(),
			...payload,
			completed: false,
			priority: 'medium',
			createdAt: new Date().toISOString(),
			updatedAt: null,
		}

		this.store.add(task)
		return task
	}

	update(id: string, patch: Partial<ApiSchemas['Task']>) {
		const existing = this.store.get(id)
		if (!existing) return null

		const updated = this.store.update(id, patch)
		return updated ?? null
	}

	delete(id: string) {
		return this.store.delete(id)
	}

	get(id: string) {
		return this.store.get(id)
	}

	list(params: TaskListParams = {}) {
		const { search = '', sort = 'createdAt' } = params

		let filteredTasks = this.store.list()

		// Поиск
		if (search) {
			filteredTasks = filteredTasks.filter((task) =>
				task.text.toLowerCase().includes(search.toLowerCase())
			)
		}

		// Сортировка
		filteredTasks.sort((a, b) => {
			switch (sort) {
				case 'completed':
					return +b.completed - +a.completed
				case 'priority':
					const order: Record<string, number> = { high: 3, medium: 2, low: 1 }
					return order[b.priority] - order[a.priority]
				case 'createdAt':
				default:
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
			}
		})

		return filteredTasks
	}

	stats() {
		return this.store.stats()
	}
}
