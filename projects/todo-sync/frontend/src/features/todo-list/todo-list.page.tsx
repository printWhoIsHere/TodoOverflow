import { useDebouncedValue } from '@/shared/lib/react'

import { useTasks } from './model/use-tasks'
import { useTasksFilters } from './model/use-tasks-filters'

import { TodoLayout } from './ui/todo-layout'
import { TodoHeader } from './ui/todo-header'
import { TodoFooter } from './ui/todo-footer'
import { TodoItem } from './ui/todo-item'
import { TodoLayoutContent } from './ui/todo-layout-content'

export default function TodoListPage() {
	const taskFilters = useTasksFilters()
	const { tasks, stats, loading } = useTasks({
		sort: taskFilters.sort,
		search: useDebouncedValue(taskFilters.search, 300),
	})

	return (
		<TodoLayout
			header={<TodoHeader stats={stats} />}
			footer={<TodoFooter stats={stats} />}
		>
			<TodoLayoutContent isEmpty={tasks.length === 0} isLoading={loading}>
				{tasks.map((task) => (
					<TodoItem key={task.id} task={task} />
				))}
			</TodoLayoutContent>
		</TodoLayout>
	)
}
