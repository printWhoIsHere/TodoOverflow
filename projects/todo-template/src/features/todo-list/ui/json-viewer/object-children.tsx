import { JsonViewer } from '../json-viewer'

interface ObjectChildrenProps {
	data: any
	level: number
}

export function ObjectChildren({ data, level }: ObjectChildrenProps) {
	const isArray = Array.isArray(data)
	const entries = isArray
		? data.map((item, index) => [index, item])
		: Object.entries(data)

	return (
		<div className='ml-6 border-l-2 border-border pl-4 space-y-1'>
			{entries.map(([key, value], index) => (
				<JsonViewer
					key={key}
					name={key.toString()}
					data={value}
					level={level + 1}
					isLast={index === entries.length - 1}
				/>
			))}
		</div>
	)
}
