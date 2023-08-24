import { NextFunction, Request, Response, Router } from 'express'
import { payInvoice } from '../controller'
import { getInvoice, getInvoiceForCompany, insertInvoice } from '../../db/services/invoice'

const invoice = Router()

invoice.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const invoice = await getInvoice(parseInt(id))
    res.json({invoice})
  } catch (error) {
    next(error)
  }
})

invoice.get('/company/:companyId', async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.params
  try {
    const invoices = await getInvoiceForCompany(parseInt(companyId))    
    res.json({ invoices })
  } catch (error) {
    next(error)
  }
})

invoice.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const newInvoice = req.body as NewInvoice
  try {
    const id = await insertInvoice(newInvoice, 'payable')
    res.json({ result: 'success', id })
  } catch (error) {
    next(error)
  }
})

invoice.post('/pay', async (req: Request, res: Response, next: NextFunction) => {
  const { accountId, invoiceId } = req.body
  try {
    await payInvoice(accountId, invoiceId)
    res.json({ result: 'success' })
  } catch (error) {
    next(error)
  }
})

export default invoice
