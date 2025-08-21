import { useQueryClient } from '@tanstack/react-query'
import { rqClient } from '@/shared/api/instance'

export const useCreateTask = () => {
	const queryClient = useQueryClient()

	const createTaskMutation = rqClient.useMutation('post', '/tasks', {
		onSettled: async () => {
			await queryClient.invalidateQueries(
				rqClient.queryOptions('get', '/tasks')
			)
		},
	})

	return {
		createTask: (text: string) =>
			createTaskMutation.mutate({
				body: { text },
			}),
		isPending: createTaskMutation.isPending,
	}
}
