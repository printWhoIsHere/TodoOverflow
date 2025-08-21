export const getValueType = (value: any): string => {
	if (value === null) return 'null'
	if (Array.isArray(value)) return 'array'
	return typeof value
}

export const getValueColor = (type: string): string => {
	switch (type) {
		case 'string':
			return 'text-emerald-600 dark:text-emerald-400'
		case 'number':
			return 'text-blue-600 dark:text-blue-400'
		case 'boolean':
			return 'text-violet-600 dark:text-violet-400'
		case 'null':
			return 'text-muted-foreground'
		case 'array':
			return 'text-orange-600 dark:text-orange-400'
		case 'object':
			return 'text-rose-600 dark:text-rose-400'
		default:
			return 'text-foreground'
	}
}

export const formatValue = (value: any): string => {
	const type = getValueType(value)
	switch (type) {
		case 'string':
			return `"${value}"`
		case 'null':
			return 'null'
		case 'boolean':
			return value.toString()
		default:
			return value.toString()
	}
}

export const copyToClipboard = (value: any) => {
	navigator.clipboard.writeText(JSON.stringify(value, null, 2))
}
