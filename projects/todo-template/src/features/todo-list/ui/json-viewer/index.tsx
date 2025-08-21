import { useState } from 'react'

import { copyToClipboard } from '../../lib/json-viewer-utils'

import { Bracket } from './bracket'
import { ObjectHeader } from './object-header'
import { ObjectChildren } from './object-children'
import { PrimitiveValue } from './primitive-value'

interface JsonViewerProps {
	data: any
	name?: string
	level?: number
	isLast?: boolean
}

export function JsonViewer({ data, name, level = 0 }: JsonViewerProps) {
	const [isExpanded, setIsExpanded] = useState(level < 2)

	// Если это примитивное значение
	if (typeof data !== 'object' || data === null) {
		return <PrimitiveValue data={data} name={name} />
	}

	// Для объектов и массивов
	const isArray = Array.isArray(data)
	const entries = isArray
		? data.map((item, index) => [index, item])
		: Object.entries(data)
	const isEmpty = entries.length === 0

	return (
		<div className='group'>
			<ObjectHeader
				name={name}
				data={data}
				isExpanded={isExpanded}
				isEmpty={isEmpty}
				onToggle={() => {
					setIsExpanded(!isExpanded)
				}}
				onCopy={() => {
					copyToClipboard(data)
				}}
			/>

			{isExpanded && !isEmpty && <ObjectChildren data={data} level={level} />}

			{isExpanded && (
				<div className='flex items-center gap-2 py-1'>
					<span className='w-6' />
					<Bracket type='close' isArray={isArray} />
				</div>
			)}
		</div>
	)
}
