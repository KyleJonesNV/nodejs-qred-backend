import { NextFunction, Request, Response, Router } from 'express'
import { getAccount, getAccountsForCompany } from '../../db/services/account'

const account = Router()

account.get('/:id', async (req: Request, res: Response, next: NextFunction) => {  
  const { id } = req.params
  try {
    const account = await getAccount(parseInt(id))
    res.json({account})
  } catch (error) {
    next(error)
  }
})

account.get('/company/:companyId', async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.params
  try {
    const accounts = await getAccountsForCompany(parseInt(companyId))
    res.json(accounts)
  } catch (error) {
    next(error)
  }
})

export default account
