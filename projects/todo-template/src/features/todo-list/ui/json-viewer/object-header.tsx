import { PropertyName } from './property-name'
import { ExpandButton } from './expand-button'
import { CollectionInfo } from './collection-info'
import { Bracket } from './bracket'

interface ObjectHeaderProps {
	name?: string
	data: any
	isExpanded: boolean
	isEmpty: boolean
	onToggle: () => void
	onCopy: () => void
}

export function ObjectHeader({
	name,
	data,
	isExpanded,
	isEmpty,
	onToggle,
	onCopy,
}: ObjectHeaderProps) {
	const isArray = Array.isArray(data)
	const entriesCount = isArray ? data.length : Object.keys(data).length

	return (
		<div
			className='flex items-center gap-2 py-1 px-2 -mx-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors'
			onClick={onCopy}
			title='Нажмите для копирования объекта'
		>
			<ExpandButton
				isExpanded={isExpanded}
				isEmpty={isEmpty}
				onToggle={onToggle}
			/>

			<PropertyName name={name} />

			<Bracket type='open' isArray={isArray} />

			{!isExpanded && !isEmpty && (
				<CollectionInfo isArray={isArray} entriesCount={entriesCount} />
			)}

			{!isExpanded && <Bracket type='close' isArray={isArray} />}
		</div>
	)
}
