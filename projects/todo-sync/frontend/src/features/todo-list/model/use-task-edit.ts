import { create } from 'zustand'

interface TaskEditStore {
	editingTaskId: string | null
	setEditingTaskId: (id: string | null) => void
	startEditing: (id: string) => void
	cancelEditing: () => void
}

export const useTaskEdit = create<TaskEditStore>((set) => ({
	editingTaskId: null,
	setEditingTaskId: (id) => set({ editingTaskId: id }),
	startEditing: (id) => set({ editingTaskId: id }),
	cancelEditing: () => set({ editingTaskId: null }),
}))
