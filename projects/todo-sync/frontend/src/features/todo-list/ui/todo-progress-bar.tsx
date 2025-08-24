import type { ApiSchemas } from '@/shared/api/schema'
import { cn } from '@/shared/lib/css'

export function TodoProgressBar({
	stats,
}: {
	stats: ApiSchemas['TasksStats']
}) {
	const progressPercentage = Math.round((stats.completed / stats.total) * 100)
	const isCompleted = stats.completed === stats.total

	return (
		<div className='space-y-2 transition-colors'>
			<div
				className={cn(
					'flex justify-between text-sm font-medium',
					isCompleted && 'text-green-500'
				)}
			>
				<span>Прогресс выполнения</span>
				<span>{progressPercentage}%</span>
			</div>

			<div className='w-full h-2.5 bg-muted rounded-full overflow-hidden'>
				<div
					className={cn(
						'relative h-full rounded-full duration-300 ease-out',
						isCompleted && 'bg-green-500'
					)}
					style={{ width: `${progressPercentage}%` }}
				>
					<div className='absolute inset-0 bg-muted-foreground/50 animate-pulse opacity-70' />
				</div>
			</div>
		</div>
	)
}
