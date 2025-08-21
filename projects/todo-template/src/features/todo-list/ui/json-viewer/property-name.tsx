interface PropertyNameProps {
	name?: string
}

export function PropertyName({ name }: PropertyNameProps) {
	if (!name) return null

	return (
		<>
			<span className='text-sky-600 dark:text-sky-400 font-medium'>
				"{name}"
			</span>
			<span className='text-muted-foreground'>:</span>
		</>
	)
}
