import winston from 'winston'

const consoleFormat = winston.format.combine(
	winston.format.splat(),
	winston.format.colorize(),
	winston.format.timestamp({ format: 'HH:mm:ss' }),
	winston.format.printf(({ level, message, timestamp, category }) => {
		const prefix = category ? `[${category}] ` : ''
		return `${timestamp} [${level}]: ${prefix.toUpperCase()} ${message}`
	})
)

const logger = winston.createLogger({
	level: process.env.LOG_LEVEL || 'debug',
	transports: [
		new winston.transports.Console({
			format: consoleFormat,
		}),
	],
})

export function getLogger(category?: string) {
	if (!category) return logger
	return logger.child({ category })
}

export const loggers = {
	app: getLogger('app'),
	socket: getLogger('socket'),
	api: getLogger('api'),
}

export default logger
