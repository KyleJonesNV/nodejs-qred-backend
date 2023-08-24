import { Account } from '../models'
import db from '../db'
import { logError } from '../../middleware/errorhandler'

export const getAccount = async (id: Number) => {
  try {
    const [account] = await db<Account>('accounts').where('id', id).select({
      id: 'id',
      spendingLimit: 'spending_limit',
      currentSpending: 'current_spending'
    })

    if (account === undefined) throw new Error('unknown id')

    return account
  } catch (error) {    
    throw error
  }
}

export const getAccountsForCompany = async (companyId: Number) => {
  try {
    const accounts = await db<Account>('accounts').where('company_id', companyId).select({
      id: 'accounts.id',
      spendingLimit: 'accounts.spending_limit',
      currentSpending: 'accounts.current_spending'
    })

    return { accounts }
  } catch (error) {
    logError(error)
  }
}

export const updateAccountSpending = async (accountId: Number, currentSpending: Number) => {
  try {
    const account = await db<Account>('accounts').where('id', accountId).update('current_spending', currentSpending).select({
      id: 'accounts.id',
      spendingLimit: 'accounts.spending_limit',
      currentSpending: 'accounts.current_spending'
    })

    return account
  } catch (error) {
    logError(error)
  }
}
