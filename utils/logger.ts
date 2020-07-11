import pino from 'pino'
import { logflarePinoVercel } from 'pino-logflare'

// @ts-ignore
const { stream, send } = logflarePinoVercel({
  apiKey: process.env.PINO_LOG_API_KEY,
  sourceToken: process.env.PINO_LOG_SOURCE_TOKEN
})

export const logger = pino({
  browser: {
    transmit: {
      level: 'info',
      // @ts-ignore
      send,
    }
  },
  level: 'debug'
}, stream)
