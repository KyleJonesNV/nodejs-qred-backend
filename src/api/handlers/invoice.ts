import { Request, Response, Router } from 'express'
import { payInvoice } from '../controller'
import { getInvoice, getInvoiceForCompany, insertInvoice } from '../../db/services/invoice'

const invoice = Router()

invoice.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const result = await getInvoice(parseInt(id))
    if (result.error) return res.status(500).json({ error: result.error })
    res.json({ invoice: result.invoice })
  } catch (error) {
    res.json(error)
  }
})

invoice.get('/company/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params
  try {
    const result = await getInvoiceForCompany(parseInt(companyId))
    if (result.error) return res.status(500).json({ error: result.error })
    res.json({ invoices: result.invoices })
  } catch (error) {
    res.json(error)
  }
})

invoice.post('/', async (req: Request, res: Response) => {
  const newInvoice = req.body as NewInvoice
  try {
    const result = await insertInvoice(newInvoice, 'payable')
    if (result.error) return res.status(500).json({ error: result.error })
    res.json({ result: 'success', id: result.id })
  } catch (error) {
    res.status(500).json(error)
  }
})

invoice.post('/pay', async (req: Request, res: Response) => {
  const { accountId, invoiceId } = req.body
  try {
    const result = await payInvoice(accountId, invoiceId)
    if (result?.error) return res.status(500).json({ error: result.error })
    res.json({ result: 'success' })
  } catch (error) {
    res.status(500).json({ error })
  }
})

export default invoice
