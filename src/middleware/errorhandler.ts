import { Request, Response, NextFunction } from 'express'

export function logError(err: any) {
  console.log(err)
}

export function logErrorMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  logError(err)
  next(err)
}

export function returnError(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(err.statusCode || 500).json({error: err.message})
}
