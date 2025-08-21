import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	TODO_LIST: '/tasks',
} as const

export type PathParams = {}

declare module 'react-router-dom' {}
