import { HttpResponse } from 'msw'
import { v4 as uuid } from 'uuid'

import { http } from '@/shared/api/mocks/http'
import type { ApiSchemas } from '@/shared/api/schema'

// Генерация тестовых данных
const mockTasks: ApiSchemas['Task'][] = Array.from({ length: 10 }, (_, i) => ({
	id: uuid(),
	text: `Task ${i + 1}`,
	completed: Math.random() > 0.7,
	createdAt: new Date(
		Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
	).toISOString(),
	updatedAt:
		Math.random() > 0.5
			? new Date(
					Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
			  ).toISOString()
			: null,
}))

export const tasksHandlers = [
	// GET /tasks — пагинация, фильтрация, сортировка
	http.get('/tasks', async ({ request }) => {
		const url = new URL(request.url)

		const page = Number(url.searchParams.get('page') || 1)
		const limit = Number(url.searchParams.get('limit') || 10)
		const search = url.searchParams.get('search')
		const completed = url.searchParams.get('completed')
		const sort = url.searchParams.get('sort')

		// Работа с копией массива
		let items = [...mockTasks]

		// Фильтрация: search
		if (search) {
			const query = search.toLowerCase()
			items = items.filter((task) => task.text.toLowerCase().includes(query))
		}

		// Фильтрация: completed
		if (completed !== null) {
			const isCompleted = completed === 'true'
			items = items.filter((task) => task.completed === isCompleted)
		}

		// Сортировка
		if (sort) {
			switch (sort) {
				case 'createdAt':
					items.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
					break
				case 'completed':
					items.sort((a, b) => Number(a.completed) - Number(b.completed))
					break
				default:
					break
			}
		}

		const total = items.length
		const totalPages = Math.ceil(total / limit)
		const startIndex = (page - 1) * limit
		const endIndex = startIndex + limit
		const paginatedTasks = items.slice(startIndex, endIndex)

		return HttpResponse.json({
			list: paginatedTasks,
			total,
			totalPages,
			currentPage: page,
		})
	}),

	// POST /tasks — создание
	http.post('/tasks', async ({ request }) => {
		const data = (await request.json()) as Partial<ApiSchemas['Task']>

		if (!data.text) {
			return HttpResponse.json(
				{ message: 'Text is required', code: 'VALIDATION_ERROR' },
				{ status: 400 }
			)
		}

		const now = new Date().toISOString()
		const newTask: ApiSchemas['Task'] = {
			id: uuid(),
			text: data.text,
			completed: data.completed || false,
			createdAt: now,
			updatedAt: null,
		}

		mockTasks.unshift(newTask)
		return HttpResponse.json(newTask, { status: 201 })
	}),

	// DELETE /tasks — удалить все
	http.delete('/tasks', async () => {
		mockTasks.length = 0
		return new HttpResponse(null, { status: 204 })
	}),

	// GET /tasks/{taskId}
	http.get('/tasks/{taskId}', async ({ params }) => {
		const { taskId } = params
		const task = mockTasks.find((task) => task.id === taskId)

		if (!task) {
			return HttpResponse.json(
				{ message: 'Task not found', code: 'NOT_FOUND' },
				{ status: 404 }
			)
		}

		return HttpResponse.json(task)
	}),

	// PATCH /tasks/{taskId}
	http.patch('/tasks/{taskId}', async ({ params, request }) => {
		const { taskId } = params
		const task = mockTasks.find((task) => task.id === taskId)

		if (!task) {
			return HttpResponse.json(
				{ message: 'Task not found', code: 'NOT_FOUND' },
				{ status: 404 }
			)
		}

		const data = (await request.json()) as Partial<ApiSchemas['Task']>
		const now = new Date().toISOString()

		if (data.text !== undefined) task.text = data.text
		if (data.completed !== undefined) task.completed = data.completed
		task.updatedAt = now

		return HttpResponse.json(task)
	}),

	// DELETE /tasks/{taskId}
	http.delete('/tasks/{taskId}', async ({ params }) => {
		const { taskId } = params
		const index = mockTasks.findIndex((task) => task.id === taskId)

		if (index === -1) {
			return HttpResponse.json(
				{ message: 'Task not found', code: 'NOT_FOUND' },
				{ status: 404 }
			)
		}

		mockTasks.splice(index, 1)
		return new HttpResponse(null, { status: 204 })
	}),
]
