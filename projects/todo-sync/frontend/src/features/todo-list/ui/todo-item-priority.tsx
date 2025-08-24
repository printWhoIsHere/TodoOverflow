import { AlertTriangle, Minus, ArrowUp } from 'lucide-react'

import type { ApiSchemas } from '@/shared/api/schema'
import { cn } from '@/shared/lib/css'

export const PRIORITIES = [
	{
		key: 'high' as const,
		label: 'Высокий',
		icon: AlertTriangle,
		colors: {
			bg: 'bg-red-500/10',
			border: 'border-red-500/40',
			text: 'text-red-600',
		},
	},
	{
		key: 'medium' as const,
		label: 'Средний',
		icon: Minus,
		colors: {
			bg: 'bg-amber-500/10',
			border: 'border-amber-500/40',
			text: 'text-amber-600',
		},
	},
	{
		key: 'low' as const,
		label: 'Низкий',
		icon: ArrowUp,
		colors: {
			bg: 'bg-blue-500/10',
			border: 'border-blue-500/40',
			text: 'text-blue-600',
		},
	},
]

interface TodoItemPriorityProps {
	priority: ApiSchemas['Task']['priority']
	className?: string
}

export function TodoItemPriority({
	priority,
	className,
}: TodoItemPriorityProps) {
	const priorityConfig =
		PRIORITIES.find((p) => p.key === priority) || PRIORITIES[1]
	const PriorityIcon = priorityConfig.icon

	return (
		<div
			className={cn(
				'text-xs px-2 py-1 rounded-full font-medium transition-opacity duration-200',
				priorityConfig.colors.text,
				className
			)}
		>
			<div className='flex items-center gap-1'>
				<PriorityIcon className='w-3 h-3' />
				<span>{priorityConfig.label}</span>
			</div>
		</div>
	)
}
