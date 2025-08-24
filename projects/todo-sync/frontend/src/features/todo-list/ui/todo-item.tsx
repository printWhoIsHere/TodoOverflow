import { cn } from '@/shared/lib/css'
import type { ApiSchemas } from '@/shared/api/schema'

import { useTaskEdit } from '../model/use-task-edit'
import { useTaskUpdate } from '../model/use-task-update'

import { TodoItemText } from './todo-item-text'
import { TodoItemPriority } from './todo-item-priority'
import { TodoItemCheckbox } from './todo-item-checkbox'
import { TodoItemContextMenu } from './todo-item-context-menu'

export function TodoItem({ task }: { task: ApiSchemas['Task'] }) {
	const { updateTask } = useTaskUpdate()
	const { startEditing } = useTaskEdit()

	const isEditing = useTaskEdit((s) => s.editingTaskId === task.id)
	const isAnotherEditing = useTaskEdit(
		(s) => s.editingTaskId !== null && s.editingTaskId !== task.id
	)

	return (
		<TodoItemContextMenu
			task={task}
			className={cn(
				'group flex items-center gap-4 py-3 px-4 rounded-md border',
				'cursor-pointer hover:scale-105 hover:shadow-lg',
				'transition-all duration-200',
				'transform-gpu will-change-transform',
				task.completed
					? 'bg-green-500/5 border-green-500/30'
					: 'border-muted-foreground/20',
				isEditing && 'scale-105 border-dashed shadow-lg cursor-default',
				isAnotherEditing &&
					'opacity-60 hover:scale-none hover:shadow-none cursor-default'
			)}
			onEditStart={() => {
				if (!task.completed) {
					startEditing(task.id)
				}
			}}
			onClick={() => {
				if (!isEditing && !isAnotherEditing) {
					updateTask(task.id, { completed: !task.completed })
				}
			}}
		>
			<div className='flex items-center gap-4 w-full'>
				<TodoItemCheckbox
					isEditing={isEditing}
					completed={task.completed}
					className={isEditing ? 'opacity-60' : ''}
				/>

				<div className='flex-1 min-w-0'>
					<TodoItemText
						id={task.id}
						text={task.text}
						completed={task.completed}
					/>
				</div>

				{!isEditing && !task.completed && (
					<TodoItemPriority
						priority={task.priority}
						className={cn(
							'opacity-70 transition-opacity duration-200',
							!isAnotherEditing && 'group-hover:opacity-100'
						)}
					/>
				)}
			</div>
		</TodoItemContextMenu>
	)
}
