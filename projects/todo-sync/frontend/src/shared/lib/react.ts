import { startTransition, useEffect, useState } from 'react'

export function useDebouncedValue<T>(value: T, delay = 300) {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const timer = setTimeout(
			() => startTransition(() => setDebouncedValue(value)),
			delay
		)

		return () => clearTimeout(timer)
	}, [value, delay])

	return debouncedValue
}
