import { createBrowserRouter, redirect } from 'react-router-dom'
import { ROUTES } from '@/shared/model/routes'

import App from '@/app/app'
import { Providers } from '@/app/providers'

export const router = createBrowserRouter([
	{
		element: (
			<Providers>
				<App />
			</Providers>
		),
		children: [
			{
				path: ROUTES.TODO_LIST,
				lazy: () => import('@/features/todo-list/todo-list.page'),
			},
		],
	},
	{
		path: ROUTES.HOME,
		loader: () => redirect(ROUTES.TODO_LIST),
	},
])
