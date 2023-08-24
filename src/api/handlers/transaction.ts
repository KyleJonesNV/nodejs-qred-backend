import { NextFunction, Request, Response, Router } from 'express'
import { getTransaction, getTransactionsForCompany } from '../../db/services/transation'

const transactions = Router()

transactions.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const transaction = await getTransaction(parseInt(id))
    res.json({transaction})
  } catch (error) {
    next(error)
  }
})

transactions.get('/company/:companyId', async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.params
  try {
    const transactions = await getTransactionsForCompany(parseInt(companyId))
    res.json({transactions})
  } catch (error) {
    next(error)
  }
})

export default transactions
