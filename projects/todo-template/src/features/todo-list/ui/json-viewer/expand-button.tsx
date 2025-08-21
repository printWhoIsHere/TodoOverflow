import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/ui/button'

interface ExpandButtonProps {
	isExpanded: boolean
	isEmpty: boolean
	onToggle: () => void
}

export function ExpandButton({
	isExpanded,
	isEmpty,
	onToggle,
}: ExpandButtonProps) {
	return (
		<Button
			variant='ghost'
			size='sm'
			onClick={(e) => {
				e.stopPropagation()
				onToggle()
			}}
			className='h-6 w-6 p-0 hover:bg-transparent'
			disabled={isEmpty}
		>
			{isEmpty ? (
				<span className='w-4' />
			) : isExpanded ? (
				<ChevronDown className='h-4 w-4 text-muted-foreground' />
			) : (
				<ChevronRight className='h-4 w-4 text-muted-foreground' />
			)}
		</Button>
	)
}
