import { useCallback, type RefCallback } from 'react'
import { useParams } from 'react-router-dom'

import { keepPreviousData } from '@tanstack/react-query'
import { rqClient } from '@/shared/api/instance'

import type { TasksSortOption } from './use-tasks-filters'
import type { ApiSchemas } from '@/shared/api/schema'

type UseTasksParams = {
	limit?: number
	search?: string
	sort?: TasksSortOption
}

export function useTasks({ limit = 5, search, sort }: UseTasksParams = {}) {
	const { userId } = useParams<{ userId: string }>()

	const { data, isPending, hasNextPage, isFetchingNextPage, fetchNextPage } =
		rqClient.useInfiniteQuery(
			'get',
			'/tasks',
			{
				params: {
					query: {
						page: 1,
						limit,
						search,
						sort,
						ownerId: userId,
					},
				},
			},
			{
				initialPageParam: 1,
				pageParamName: 'page',
				getNextPageParam: (
					lastPage: ApiSchemas['TasksList'],
					_: ApiSchemas['TasksList'][],
					lastPageParams: number
				) =>
					Number(lastPageParams) < lastPage.totalPages
						? lastPageParams + 1
						: null,
				placeholderData: keepPreviousData,
			}
		)

	const cursorRef: RefCallback<HTMLDivElement> = useCallback(
		(element) => {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
						fetchNextPage()
					}
				},
				{ threshold: 0.5 }
			)

			if (element) {
				observer.observe(element)

				return () => {
					observer.disconnect()
				}
			}
		},
		[fetchNextPage, hasNextPage, isFetchingNextPage]
	)

	const tasks = data?.pages.flatMap((page) => page.list) ?? []

	return {
		tasks,
		isPending,
		hasNextPage,
		isFetchingNextPage,
		cursorRef,
	}
}
