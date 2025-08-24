import { CheckIcon, PenToolIcon } from 'lucide-react'

import { cn } from '@/shared/lib/css'

interface TaskCheckboxProps {
	completed: boolean
	isEditing?: boolean
	className?: string
}

export function TodoItemCheckbox({
	completed,
	isEditing,
	className,
}: TaskCheckboxProps) {
	return (
		<div
			className={cn(
				'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
				completed
					? 'bg-green-500/80 border-green-500'
					: 'border-muted-foreground/30',
				className
			)}
		>
			{completed && <CheckIcon className='w-4 h-4 text-white' />}
			{isEditing && <PenToolIcon className='w-4 h-4 text-white' />}
		</div>
	)
}
