import { useDebouncedValue } from '@/shared/lib/react'

import { useTasks } from './model/use-tasks'
import { useTasksFilters } from './model/use-tasks-filters'

import { JsonViewer } from './ui/json-viewer'
import { TodoLayout } from './ui/todo-layout'
import { TodoLayoutContent } from './ui/todo-layout-content'

export default function TodoListPage() {
	const todoFilters = useTasksFilters()
	const todoQuery = useTasks({
		sort: todoFilters.sort,
		search: useDebouncedValue(todoFilters.search, 300),
	})

	return (
		<TodoLayout>
			<TodoLayoutContent
				isEmpty={!todoQuery.tasks.length}
				isPending={todoQuery.isPending}
			>
				<div className='bg-muted rounded-lg p-4 border flex-1 min-h-0 overflow-auto'>
					<JsonViewer data={todoQuery.tasks} name='tasks' level={0} />

					<div ref={todoQuery.cursorRef} className='text-center py-4 mt-4'>
						{todoQuery.isFetchingNextPage && (
							<div className='text-muted-foreground'>Loading more...</div>
						)}
					</div>
				</div>
			</TodoLayoutContent>
		</TodoLayout>
	)
}

export const Component = TodoListPage
