import { Request, Response, Router } from 'express'
import { getTransaction, getTransactionsForCompany } from '../../db/services/transation'

const transactions = Router()

transactions.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const transation = await getTransaction(parseInt(id))
    if (transation.error) res.json({ error: transation.error })
    res.json(transation)
  } catch (error) {
    res.json(error)
  }
})

transactions.get('/company/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params
  try {
    const transactions = await getTransactionsForCompany(parseInt(companyId))
    if (transactions.error) return res.json({ error: transactions.error })
    res.json(transactions)
  } catch (error) {
    res.json(error)
  }
})

export default transactions
