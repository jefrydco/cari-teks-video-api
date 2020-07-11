import { logger } from "./logger"

export function isExists(data: any) {
  logger.info(String(data !== null && typeof data !== undefined))
  return data !== null && typeof data !== undefined
}