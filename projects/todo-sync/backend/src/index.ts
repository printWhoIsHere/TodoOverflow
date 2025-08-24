import http from 'http'
import express from 'express'
import cors from 'cors'

import logger, { loggers } from '@/utils/logger'
import { initSocketServer } from '@/socket'

const PORT: number = Number(process.env.PORT) || 3000
const HOST: string = process.env.HOST || '0.0.0.0'

const app = express()
const server = http.createServer(app)

// Middleware
app.use(
	cors({
		origin: true,
		credentials: true,
	})
)
app.use(express.json())

const { io, taskStore, userStore } = initSocketServer(server)

app.get('/api/health', (_, res) => {
	res.status(200).json({
		status: 'ok',
		time: new Date().toISOString(),
		uptime: process.uptime(),
		socketClients: io ? io.engine.clientsCount : 0,
	})
})

app.get('/api/ready', (_, res) => {
	try {
		const tasksCount = taskStore.list().length
		const usersCount = userStore.list().length

		res.status(200).json({
			status: 'ready',
			tasksCount,
			usersCount,
		})
	} catch (error) {
		logger.error('Readiness check failed', error)
		res.status(500).json({ status: 'not_ready' })
	}
})

server.listen(PORT, HOST, () => {
	loggers.app.info(`Server running at http://${HOST}:${PORT}`)
})
