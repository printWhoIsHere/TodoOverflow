import {
	getValueType,
	getValueColor,
	formatValue,
	copyToClipboard,
} from '../../lib/json-viewer-utils'
import { PropertyName } from './property-name'

interface PrimitiveValueProps {
	data: any
	name?: string
}

export function PrimitiveValue({ data, name }: PrimitiveValueProps) {
	const type = getValueType(data)

	return (
		<div
			className='flex items-center gap-2 py-1 px-2 -mx-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors group'
			onClick={() => copyToClipboard(data)}
			title='Нажмите для копирования'
		>
			<PropertyName name={name} />
			<span className={`font-mono text-sm ${getValueColor(type)}`}>
				{formatValue(data)}
			</span>
		</div>
	)
}
