import { Skeleton } from '@/shared/ui/skeleton'

interface TodoLayoutContentProps {
	children: React.ReactNode
	isEmpty?: boolean
	isLoading?: boolean
}

export function TodoLayoutContent({
	children,
	isEmpty,
	isLoading,
}: TodoLayoutContentProps) {
	if (isLoading)
		return (
			<div className='flex flex-col gap-2'>
				{Array.from({ length: 10 }).map((_, i) => (
					<Skeleton key={i} className='h-10 w-full bg-muted-foreground/50' />
				))}
			</div>
		)

	if (isEmpty) {
		return <div className='flex items-center justify-center'>No Tasks</div>
	}

	return <div className='flex flex-col gap-2'>{children}</div>
}
