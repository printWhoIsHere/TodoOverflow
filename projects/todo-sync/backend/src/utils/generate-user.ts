import { createAvatar } from '@dicebear/core'
import { adventurer } from '@dicebear/collection'

import type { ApiSchemas } from '@/types'

export function generateUser(
	id: string,
	socketId: string,
	username?: string,
	overrides?: Partial<ApiSchemas['User']>
): ApiSchemas['User'] {
	return {
		id,
		socketId,
		username: username ?? `Guest-${id.slice(0, 6)}`,
		avatar: createAvatar(adventurer, {
			seed: id,
			size: 120,
			backgroundColor: [
				Math.floor(Math.random() * 16777215)
					.toString(16)
					.padStart(6, '0'),
			],
		}).toDataUri(),
		...overrides,
	}
}
