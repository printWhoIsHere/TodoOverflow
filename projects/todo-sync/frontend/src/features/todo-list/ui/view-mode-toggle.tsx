import { FunnelPlusIcon, ListPlusIcon } from 'lucide-react'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'

type ViewMode = 'adding' | 'filters'

function ViewModeToggle({
	value,
	onChange,
}: {
	value: ViewMode
	onChange: (value: ViewMode) => void
}) {
	return (
		<Tabs defaultValue={value} onValueChange={(e) => onChange(e as ViewMode)}>
			<TabsList>
				<TabsTrigger value='adding'>
					<ListPlusIcon />
				</TabsTrigger>
				<TabsTrigger value='filters'>
					<FunnelPlusIcon />
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}

export { ViewModeToggle, type ViewMode }
