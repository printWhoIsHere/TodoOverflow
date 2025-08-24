import { useLayoutEffect, useRef } from 'react'

import { cn } from '@/shared/lib/css'
import { Input } from '@/shared/ui/input'

import { useTaskEdit } from '../model/use-task-edit'
import { useTaskUpdate } from '../model/use-task-update'

interface TaskTextProps {
	id: string
	text: string
	completed: boolean
}

export function TodoItemText({ id, text, completed }: TaskTextProps) {
	const { editingTaskId, cancelEditing } = useTaskEdit()
	const isEditing = editingTaskId === id

	const { updateTask } = useTaskUpdate()

	const inputRef = useRef<HTMLInputElement>(null)

	useLayoutEffect(() => {
		if (!isEditing && !inputRef.current) return

		const rafId = requestAnimationFrame(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})

		const timeout = setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		}, 0)

		return () => {
			cancelAnimationFrame(rafId)
			clearTimeout(timeout)
		}
	})

	const handleSave = () => {
		const newText = inputRef.current?.value.trim() || text
		if (newText && newText !== text) {
			updateTask(id, { text: newText })
		}
		cancelEditing()
	}

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') handleSave()
		if (e.key === 'Escape') cancelEditing()
	}

	if (isEditing) {
		return (
			<Input
				ref={inputRef}
				defaultValue={text}
				onKeyDown={handleKeyDown}
				onBlur={handleSave}
				className='border-none shadow-none bg-muted-foreground/10 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto py-1'
			/>
		)
	}

	return (
		<p
			className={cn(
				'truncate',
				completed && 'line-through text-muted-foreground'
			)}
		>
			{text}
		</p>
	)
}
