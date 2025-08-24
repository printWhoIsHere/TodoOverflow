import { Search } from 'lucide-react'
import { Input } from '@/shared/ui/input'

interface TodoSearchInputProps {
	value: string
	onChange: (value: string) => void
	className?: string
}

export function TodoSearchInput({
	value,
	onChange,
	className,
}: TodoSearchInputProps) {
	return (
		<div className={className}>
			<div className='relative'>
				<Search className='w-3 h-3 absolute left-3 top-1/2 transform -translate-y-1/2' />
				<Input
					id='search'
					type='text'
					placeholder='Search by text'
					className='w-full pl-8 pr-4 py-2 text-sm'
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</div>
		</div>
	)
}
