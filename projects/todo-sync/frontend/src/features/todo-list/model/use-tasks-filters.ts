import { create } from 'zustand'

export type TasksSortOption = 'createdAt' | 'completed' | 'priority'

interface TasksFiltersStore {
	search: string
	sort: TasksSortOption
	setSearch: (search: string) => void
	setSort: (sort: TasksSortOption) => void
}

export const useTasksFilters = create<TasksFiltersStore>((set) => ({
	search: '',
	sort: 'createdAt',
	setSearch: (search) => set({ search }),
	setSort: (sort) => set({ sort }),
}))
