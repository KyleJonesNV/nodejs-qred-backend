import express from 'express'
import { Request, Response, NextFunction } from 'express'
import serverless from 'serverless-http'
import routes from './api/routes/index'

import 'dotenv/config'

const app = express()

app.use(express.json())

app.use('/', routes)

app.use((req: Request, res: Response) => {
  res.status(404).send('Not found')
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).send(err)
})


export default app
// export const handler = serverless(app)