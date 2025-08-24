import logger from '@/utils/logger'
import { TaskService } from '@/services/task.service'
import type { ApiSchemas } from '@/types'

type MockTask = Required<Pick<ApiSchemas['Task'], 'text'>> &
	Partial<Pick<ApiSchemas['Task'], 'completed' | 'priority'>>

export function seedMockTasks(taskService: TaskService) {
	if (process.env.NODE_ENV === 'production') return

	const samples: MockTask[] = [
		{ text: 'Buy groceries', priority: 'medium' },
		{ text: 'Read "Clean Code"', priority: 'low' },
		{ text: 'Pay electricity bill', priority: 'high' },
		{ text: 'Fix bug in auth flow', priority: 'high' },
		{ text: 'Prepare slides for meeting', priority: 'medium' },
		{ text: 'Clean inbox', priority: 'low' },
		{ text: 'Write unit tests for todo service', priority: 'medium' },
		{ text: 'Release v0.1.0', priority: 'high' },
	]

	const toMarkCompleted = new Set([0, 5])

	samples.forEach((s, idx) => {
		try {
			const task = taskService.create({
				text: s.text,
				completed: s.completed ?? false,
				priority: s.priority ?? 'medium',
			})

			if (toMarkCompleted.has(idx)) {
				taskService.update(task.id, { completed: true })
			}
		} catch (error) {
			logger.error(`Seeded failed for ${s}`, error)
		}
	})

	logger.debug(`Seeded ${samples.length} tasks`)
}
