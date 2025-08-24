import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui/select'
import type { TasksSortOption } from '../model/use-tasks-filters'

interface TodoSortSelectProps {
	value: TasksSortOption
	onValueChange: (value: TasksSortOption) => void
}

export function TodoSortSelect({ value, onValueChange }: TodoSortSelectProps) {
	return (
		<Select value={value} onValueChange={onValueChange}>
			<SelectTrigger id='sort' className='w-48'>
				<SelectValue placeholder='Sorting' />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='createdAt'>Создание</SelectItem>
				<SelectItem value='completed'>Статус</SelectItem>
				<SelectItem value='priority'>Приоритет</SelectItem>
			</SelectContent>
		</Select>
	)
}
