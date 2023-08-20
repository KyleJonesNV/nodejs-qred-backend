import { Card } from '../models'
import db from '../db'

export const getCard = async (id: Number) => {
  try {
    const [card] = await db<Card>('cards').where('id', id).select({
      id: 'id',
      companyId: 'company_id',
      status: 'status'
    })

    return { card }
  } catch (error) {
    return { error }
  }
}

export const getCardsForCompany = async (companyId: Number) => {
  try {
    const cards = await db<Card>('cards').where('company_id', companyId).select({
      id: 'id',
      companyId: 'company_id',
      status: 'status'
    })

    return { cards }
  } catch (error) {
    return { error }
  }
}

export const updateCardStatus = async (id: Number, status: string) => {
  try {
    await db('cards').update('status', status).where('id', id)
  } catch (error) {
    return { error }
  }
}