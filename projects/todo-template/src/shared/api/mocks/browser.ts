import { setupWorker } from 'msw/browser'

import { tasksHandlers } from './handlers/tasks'

export const worker = setupWorker(...tasksHandlers)
