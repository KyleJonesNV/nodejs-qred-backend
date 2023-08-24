import { NextFunction, Request, Response, Router } from 'express'
import { getCompany, getCompanyByName, insertCompany } from '../../db/services/company'

const company = Router()

company.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const company = await getCompany(parseInt(id))
    res.json({company})
  } catch (error) {
    next(error)
  }
})

company.get('/name/:name', async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  try {
    const company = await getCompanyByName(name)
    res.json({company})
  } catch (error) {
    next(error)
  }
})

company.post('/', async (req: Request, res: Response, next: NextFunction) => {  
  const {name} = req.body
  
  try {
    await insertCompany(name)
    res.json({ result: 'success' })
  } catch (error) {
    next(error)
  }
})

export default company
