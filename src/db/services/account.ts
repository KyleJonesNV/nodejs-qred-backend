import { Account } from '../models'
import knex from '../db'

export const getAccount = async (id: Number) => {
  try {
    const [account] = await knex<Account>('accounts').where('id', id).select({
      id: 'id',
      spendingLimit: 'spending_limit',
      currentSpending: 'current_spending'
    })

    return { account }
  } catch (error) {
    return { error }
  }
}

export const getAccountsForCompany = async (companyId: Number) => {
  try {
    const accounts = await knex<Account>('accounts').where('company_id', companyId).select({
      id: 'accounts.id',
      spendingLimit: 'accounts.spending_limit',
      currentSpending: 'accounts.current_spending'
    })

    return { accounts }
  } catch (error) {
    console.log(error)
    return { error }
  }
}