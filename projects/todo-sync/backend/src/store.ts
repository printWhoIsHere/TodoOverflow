import type { ApiSchemas } from '@/types'

export class UserStore {
	private users = new Map<string, ApiSchemas['User']>()
	private socketToId = new Map<string, string>()

	add(user: ApiSchemas['User']) {
		this.users.set(user.id, user)
		this.socketToId.set(user.socketId, user.id)
	}

	get(id: string) {
		return this.users.get(id)
	}

	removeById(id: string) {
		const user = this.users.get(id)
		if (!user) return

		this.socketToId.delete(user.socketId)
		this.users.delete(id)
	}

	getBySocket(socketId: string) {
		const id = this.socketToId.get(socketId)
		return id ? this.users.get(id) : undefined
	}

	removeBySocket(socketId: string) {
		const id = this.socketToId.get(socketId)
		if (!id) return

		this.socketToId.delete(socketId)
		this.users.delete(id)
	}

	list() {
		return Array.from(this.users.values())
	}
}

export class TaskStore {
	private tasks = new Map<string, ApiSchemas['Task']>()

	add(task: ApiSchemas['Task']) {
		this.tasks.set(task.id, task)
	}

	get(id: string) {
		return this.tasks.get(id)
	}

	update(id: string, patch: Partial<ApiSchemas['Task']>) {
		const task = this.tasks.get(id)
		if (!task) return undefined

		const updated = { ...task, ...patch, updatedAt: new Date().toISOString() }
		this.tasks.set(id, updated)
		return updated
	}

	delete(id: string) {
		return this.tasks.delete(id)
	}

	list() {
		return Array.from(this.tasks.values())
	}

	stats(): ApiSchemas['TasksStats'] {
		const list = this.list()

		const total = list.length
		const completed = list.filter((task) => task.completed).length

		return { total, completed }
	}
}
