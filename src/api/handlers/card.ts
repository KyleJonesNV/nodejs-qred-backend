import { Request, Response, Router } from 'express'
import { activateCard, deactivateCard } from '../controller'
import { getCard, getCardsForCompany } from '../../db/services/card'

const card = Router()

card.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    const card = await getCard(parseInt(id))
    res.json(card)
  } catch (error) {
    res.json(error)
  }
})

card.get('/company/:companyId', async (req: Request, res: Response) => {
  const { companyId } = req.params
  try {
    const cards = await getCardsForCompany(parseInt(companyId))
    res.json(cards)
  } catch (error) {
    res.json(error)
  }
})

card.post('/activate/:cardId', async (req: Request, res: Response) => {
  const { cardId } = req.params
  try {
    const response = await activateCard(parseInt(cardId))
    if (response?.error) res.json({ error: response?.error?.toString() })
    res.json({ result: 'success' })
  } catch (error) {
    res.json({ error })
  }
})

card.post('/deactivate/:cardId', async (req: Request, res: Response) => {
  const { cardId } = req.params
  try {
    const response = await deactivateCard(parseInt(cardId))
    if (response?.error) res.json({ error: response?.error?.toString() })
    res.json({ result: 'success' })
  } catch (error) {
    res.json({ error })
  }
})

export default card
