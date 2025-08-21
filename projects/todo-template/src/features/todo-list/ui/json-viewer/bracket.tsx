import { getValueColor } from '../../lib/json-viewer-utils'

interface BracketProps {
	type: 'open' | 'close'
	isArray: boolean
}

export function Bracket({ type, isArray }: BracketProps) {
	const colorClass = getValueColor(isArray ? 'array' : 'object')

	if (type === 'open') {
		return (
			<span className={`font-mono text-sm ${colorClass}`}>
				{isArray ? '[' : '{'}
			</span>
		)
	}

	return (
		<span className={`font-mono text-sm ${colorClass}`}>
			{isArray ? ']' : '}'}
		</span>
	)
}
