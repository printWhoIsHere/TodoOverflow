import { Card, CardContent, CardFooter, CardHeader } from '@/shared/ui/card'

interface TodoLayoutProps {
	header: React.ReactNode
	footer: React.ReactNode
	children: React.ReactNode
}

export function TodoLayout({ header, footer, children }: TodoLayoutProps) {
	return (
		<div className='overflow-hidden'>
			<Card className='flex flex-col max-w-2xl mx-auto shadow-2xl my-4 h-[calc(100vh-2rem)] overflow-hidden'>
				<CardHeader className='flex-shrink-0'>{header}</CardHeader>
				<CardContent className='flex-1 flex items-start overflow-hidden p-0'>
					<div className='w-full h-full overflow-y-auto px-6 py-4'>
						{children}
					</div>
				</CardContent>
				<CardFooter>{footer}</CardFooter>
			</Card>
		</div>
	)
}
