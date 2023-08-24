import { getAccount, updateAccountSpending } from '../../db/services/account'
import { updateCardStatus } from '../../db/services/card'
import { getInvoice, updateInvoiceStatus } from '../../db/services/invoice'
import { insertTransation } from '../../db/services/transation'

export const payInvoice = async (accountId: Number, invoiceId: Number) => {
  try {
    // 1 Check if account has available fund to cover invoice
    const account = await getAccount(accountId)
    if (!account) throw new Error(`no account found for ${accountId}`)

    const invoice = await getInvoice(invoiceId)
    if (!invoice) throw new Error(`no invoice found for ${invoiceId}`)

    const remainingSpending = account.spendingLimit - account.currentSpending
    if (remainingSpending < invoice.amount) throw new Error(`limited reach, cannot pay invoice, renaming amount to spend: ${remainingSpending}, invoice amount: ${invoice.amount}`)

    // 2 Update third party vendor ...
    // Outside the scope of this project

    // 3 Add a transation
    const transation = await insertTransation({
      accountId,
      invoiceId,
      vendorId: invoice.vendorId,
      amount: invoice.amount
    })
    if (!transation) throw new Error ('error inserting transaction')

    // 4 Update invoice
    await updateInvoiceStatus(invoiceId, 'paid')

    // 5 Add spending to accoount
    const updatedAccount = await updateAccountSpending(account.id, account.currentSpending + invoice.amount)
    if (!updatedAccount) throw new Error('update account failed')
  } catch (error) {
    throw error
  }
}

export const activateCard = async (cardId: number) => {
  return updateCardStatus(cardId, 'active')
}

export const deactivateCard = async (cardId: number) => {
  return updateCardStatus(cardId, 'deactive')
}
