import { Children } from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/shared/lib/css'
import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/shared/ui/tooltip'

type TooltipContentProps = React.ComponentProps<typeof TooltipContent>

function AvatarContainer({
	children,
	zIndex,
	tooltipContent,
	tooltipProps,
}: {
	children: React.ReactNode
	zIndex: number
	tooltipContent?: React.ReactNode
	tooltipProps?: Partial<TooltipContentProps>
}) {
	return (
		<TooltipPrimitive.Root>
			<TooltipTrigger>
				<div
					data-slot='avatar-container'
					className='relative transition-transform duration-300 ease-out hover:-translate-y-2'
					style={{ zIndex }}
				>
					{children}
				</div>
			</TooltipTrigger>

			{tooltipContent && (
				<AvatarGroupTooltip {...tooltipProps}>
					{tooltipContent}
				</AvatarGroupTooltip>
			)}
		</TooltipPrimitive.Root>
	)
}

type AvatarGroupTooltipProps = TooltipContentProps
function AvatarGroupTooltip(props: AvatarGroupTooltipProps) {
	return <TooltipContent {...props} />
}

type AvatarGroupProps = Omit<React.ComponentProps<'div'>, 'translate'> & {
	children?: React.ReactNode
	invertOverlap?: boolean
	tooltipProps?: Partial<TooltipContentProps>
}

function AvatarGroup({
	children,
	className,
	invertOverlap = false,
	tooltipProps = { side: 'top', sideOffset: 24 },
	...props
}: AvatarGroupProps) {
	const childArray = Children.toArray(children)

	if (childArray.length === 0) return null

	return (
		<TooltipProvider delayDuration={0}>
			<div
				data-slot='avatar-group'
				className={cn('flex items-center -space-x-3', className)}
				{...props}
			>
				{childArray.map((child, index) => {
					const zIndex = invertOverlap ? childArray.length - index : index

					return (
						<AvatarContainer
							key={index}
							zIndex={zIndex}
							tooltipProps={tooltipProps}
						>
							{child}
						</AvatarContainer>
					)
				})}
			</div>
		</TooltipProvider>
	)
}

export {
	AvatarGroup,
	AvatarGroupTooltip,
	type AvatarGroupProps,
	type AvatarGroupTooltipProps,
}
