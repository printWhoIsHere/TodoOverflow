import { useQueryClient } from '@tanstack/react-query'
import { rqClient } from '@/shared/api/instance'

export const useDeleteTask = () => {
	const queryClient = useQueryClient()

	const deleteTaskMutation = rqClient.useMutation('delete', '/tasks/{taskId}', {
		onSettled: async () => {
			await queryClient.invalidateQueries(
				rqClient.queryOptions('get', '/tasks')
			)
		},
	})

	return {
		deleteTask: (taskId: string) =>
			deleteTaskMutation.mutate({
				params: {
					path: { taskId },
				},
			}),
		isPending: deleteTaskMutation.isPending,
	}
}
