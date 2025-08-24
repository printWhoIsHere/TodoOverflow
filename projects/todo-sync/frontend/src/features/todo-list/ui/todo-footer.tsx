import { useState } from 'react'

import type { ApiSchemas } from '@/shared/api/schema'

import { ViewModeToggle, type ViewMode } from './view-mode-toggle'

import { useTasksFilters } from '../model/use-tasks-filters'

import { TodoProgressBar } from './todo-progress-bar'
import { TodoSearchInput } from './todo-search-input'
import { TodoCreateForm } from './todo-create-form'
import { TodoSortSelect } from './todo-sort-select'

interface TodoFooterProps {
	stats: ApiSchemas['TasksStats']
}

export function TodoFooter({ stats }: TodoFooterProps) {
	const todoFilters = useTasksFilters()

	const [viewMode, setViewMode] = useState<ViewMode>('adding')

	return (
		<div className='w-full space-y-4'>
			<TodoProgressBar stats={stats} />

			<div className='flex items-center justify-between gap-4 p-2 bg-muted/10 rounded-lg border border-dashed border-muted-foreground/20'>
				<ViewModeToggle value={viewMode} onChange={(v) => setViewMode(v)} />

				<div className='flex-1'>
					{viewMode === 'adding' && <TodoCreateForm />}

					{viewMode === 'filters' && (
						<div className='flex items-center justify-between gap-4'>
							<TodoSearchInput
								value={todoFilters.search}
								onChange={todoFilters.setSearch}
								className='flex-1'
							/>
							<TodoSortSelect
								value={todoFilters.sort}
								onValueChange={todoFilters.setSort}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
