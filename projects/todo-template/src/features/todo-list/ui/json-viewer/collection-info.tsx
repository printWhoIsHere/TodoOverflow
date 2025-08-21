interface CollectionInfoProps {
	isArray: boolean
	entriesCount: number
}

export function CollectionInfo({ isArray, entriesCount }: CollectionInfoProps) {
	return (
		<span className='text-muted-foreground text-sm'>
			{isArray ? `${entriesCount} items` : `${entriesCount} properties`}
		</span>
	)
}
