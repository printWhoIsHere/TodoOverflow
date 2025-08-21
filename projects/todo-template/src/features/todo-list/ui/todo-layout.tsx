interface TodoLayoutProps {
	children: React.ReactNode
}

export function TodoLayout({ children }: TodoLayoutProps) {
	return (
		<div className='h-screen flex flex-col'>
			<div className='container mx-auto p-6 flex-1 flex flex-col min-h-0'>
				{children}
			</div>
		</div>
	)
}
