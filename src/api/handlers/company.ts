import { Request, Response, Router } from 'express'
import { getCompany, getCompanyByName, insertCompany } from '../../db/services/company'

const company = Router()

company.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const company = await getCompany(parseInt(id))
    res.json({company: company})
  } catch (error) {
    res.json(error)
  }
})

company.get('/name/:name', async (req: Request, res: Response) => {
  const { name } = req.params
  try {
    const company = await getCompanyByName(name)
    res.json({company: company})
  } catch (error) {
    res.json(error)
  }
})

company.post('/', async (req: Request, res: Response) => {  
  const {name} = req.body
  
  try {
    const result = await insertCompany(name)
    res.json(result)
  } catch (error) {
    res.json(error)
  }
})

export default company
