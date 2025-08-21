import { useQueryClient } from '@tanstack/react-query'
import { rqClient } from '@/shared/api/instance'
import type { ApiSchemas } from '@/shared/api/schema'

export const useUpdateTask = () => {
	const queryClient = useQueryClient()

	const updateTaskMutation = rqClient.useMutation('patch', '/tasks/{taskId}', {
		onSettled: async () => {
			await queryClient.invalidateQueries(
				rqClient.queryOptions('get', '/tasks')
			)
		},
	})

	return {
		updateTask: (
			taskId: string,
			updates: Partial<Pick<ApiSchemas['Task'], 'text' | 'completed'>>
		) =>
			updateTaskMutation.mutate({
				params: {
					path: { taskId },
				},
				body: updates,
			}),
		isPending: updateTaskMutation.isPending,
	}
}
