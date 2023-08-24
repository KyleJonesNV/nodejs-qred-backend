import { NextFunction, Request, Response, Router } from 'express'
import { activateCard, deactivateCard } from '../controller'
import { getCard, getCardsForCompany } from '../../db/services/card'

const card = Router()

card.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  try {
    const card = await getCard(parseInt(id))
    res.json({card})
  } catch (error) {
    next(error)
  }
})

card.get('/company/:companyId', async (req: Request, res: Response, next: NextFunction) => {
  const { companyId } = req.params
  try {
    const cards = await getCardsForCompany(parseInt(companyId))
    res.json({cards})
  } catch (error) {
    next(error)
  }
})

card.post('/activate/:cardId', async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params
  try {
    await activateCard(parseInt(cardId))
    res.json({ result: 'success' })
  } catch (error) {
    next(error)
  }
})

card.post('/deactivate/:cardId', async (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params
  try {
    await deactivateCard(parseInt(cardId))
    res.json({ result: 'success' })
  } catch (error) {
    next(error)
  }
})

export default card
