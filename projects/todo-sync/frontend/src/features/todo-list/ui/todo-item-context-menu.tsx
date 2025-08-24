import { cn } from '@/shared/lib/css'
import type { ApiSchemas } from '@/shared/api/schema'

import {
	ContextMenu,
	ContextMenuCheckboxItem,
	ContextMenuContent,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuSub,
	ContextMenuSubContent,
	ContextMenuSubTrigger,
	ContextMenuTrigger,
} from '@/shared/ui/context-menu'

import { useTaskUpdate } from '../model/use-task-update'
import { useTaskDelete } from '../model/use-task-delete'
import { useTaskEdit } from '../model/use-task-edit'
import { PRIORITIES } from './todo-item-priority'

interface TaskContextMenuProps {
	task: ApiSchemas['Task']
	children: React.ReactNode
	className?: string
	onEditStart: () => void
	onClick?: (e: React.MouseEvent) => void
}

export function TodoItemContextMenu({
	task,
	children,
	className,
	onEditStart,
	onClick,
}: TaskContextMenuProps) {
	const { updateTask } = useTaskUpdate()
	const { deleteTask } = useTaskDelete()
	const { startEditing, cancelEditing } = useTaskEdit()

	const handleCompleteToggle = () => {
		updateTask(task.id, { completed: !task.completed })
	}

	const handleEditStart = () => {
		if (onEditStart) {
			onEditStart()
		} else {
			if (!task.completed) {
				startEditing(task.id)
			}
		}
	}

	return (
		<ContextMenu>
			<ContextMenuTrigger className={className} onClick={onClick}>
				{children}
			</ContextMenuTrigger>

			<ContextMenuContent className='max-w-[200px]'>
				<ContextMenuLabel className='line-clamp-2 px-2 py-1.5 text-sm'>
					{task.text}
				</ContextMenuLabel>

				<ContextMenuCheckboxItem
					checked={task.completed}
					onCheckedChange={handleCompleteToggle}
					disabled={task.completed}
				>
					Выполнено
				</ContextMenuCheckboxItem>
				<ContextMenuCheckboxItem
					checked={!task.completed}
					onCheckedChange={handleCompleteToggle}
					disabled={!task.completed}
				>
					Не выполнено
				</ContextMenuCheckboxItem>

				<ContextMenuSeparator />

				<ContextMenuSub>
					<ContextMenuSubTrigger inset>Приоритет</ContextMenuSubTrigger>
					<ContextMenuSubContent>
						{PRIORITIES.map((priority) => (
							<ContextMenuCheckboxItem
								key={priority.key}
								checked={task.priority === priority.key}
								onCheckedChange={() =>
									updateTask(task.id, { priority: priority.key })
								}
							>
								<div className='flex items-center gap-2'>
									<div
										className={cn(
											'w-2 h-2 rounded-full',
											priority.key === 'low' && 'bg-blue-500',
											priority.key === 'medium' && 'bg-yellow-500',
											priority.key === 'high' && 'bg-red-500'
										)}
									/>
									<span>{priority.label}</span>
								</div>
							</ContextMenuCheckboxItem>
						))}
					</ContextMenuSubContent>
				</ContextMenuSub>

				<ContextMenuSeparator />

				<ContextMenuItem
					inset
					onSelect={handleEditStart}
					disabled={task.completed}
				>
					Редактировать текст
				</ContextMenuItem>
				<ContextMenuItem
					inset
					onClick={() => {
						if (useTaskEdit.getState().editingTaskId === task.id)
							cancelEditing()
						deleteTask(task.id)
					}}
					className='text-red-600 focus:text-red-700'
				>
					Удалить
				</ContextMenuItem>
			</ContextMenuContent>
		</ContextMenu>
	)
}
