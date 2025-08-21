interface TodoLayoutContentProps {
	children?: React.ReactNode
	isEmpty?: boolean
	isPending?: boolean
}

export function TodoLayoutContent({
	children,
	isEmpty,
	isPending,
}: TodoLayoutContentProps) {
	if (isPending) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<div className='text-center'>Loading...</div>
			</div>
		)
	}

	if (isEmpty) {
		return (
			<div className='flex-1 flex items-center justify-center'>
				<div className='text-center'>No data</div>
			</div>
		)
	}

	return <>{children}</>
}
