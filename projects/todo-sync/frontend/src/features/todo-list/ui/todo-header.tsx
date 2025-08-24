import type { ApiSchemas } from '@/shared/api/schema'

import { cn } from '@/shared/lib/css'

import { CardTitle } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { AvatarGroup, AvatarGroupTooltip } from '@/shared/ui/avatar-group'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'

import { useUsersData } from '../model/use-users-data'

interface TodoHeaderProps {
	stats: ApiSchemas['TasksStats']
}

export function TodoHeader({ stats }: TodoHeaderProps) {
	const { users, currentUser, loading } = useUsersData()

	return (
		<div className='space-y-2'>
			<div className='flex justify-between'>
				<CardTitle className='text-4xl font-black'>Todo Sync</CardTitle>

				<span className='text-muted-foreground'>
					Выполнено: {stats.completed} из {stats.total}
				</span>
			</div>

			<AvatarGroup>
				{(loading || users.length === 0) &&
					Array.from({ length: 6 }).map((_, i) => (
						<Skeleton
							key={i}
							className='size-8 rounded-full bg-muted-foreground'
						/>
					))}

				{!loading &&
					users.map((user) => (
						<Avatar
							key={user.id}
							className={cn(
								user.id === currentUser?.id &&
									'ring-2 ring-offset-2 ring-offset-background ring-primary'
							)}
						>
							<AvatarImage src={user.avatar} />
							<AvatarFallback>{user.avatar?.charAt(0)}</AvatarFallback>
							<AvatarGroupTooltip>
								<span>
									{user.id === currentUser?.id ? 'You' : user.username}
								</span>
							</AvatarGroupTooltip>
						</Avatar>
					))}
			</AvatarGroup>
		</div>
	)
}
