import { getAccount } from "../../db/services/account"
import { updateCardStatus } from "../../db/services/card"
import { getInvoice, updateInvoiceStatus } from "../../db/services/invoice"
import { insertTransation } from "../../db/services/transation"


export const payInvoice = async (accountId: Number, invoiceId: Number) => {
  try {
    // 1 Check if account has available fund to cover invoice
    const accountResponse = await getAccount(accountId)
    if (accountResponse.error) throw new Error(accountResponse.error?.toString())
    if (!accountResponse.account) throw new Error(`no account found for ${accountId}`)
    const { account } = accountResponse

    const invoiceResponse = await getInvoice(invoiceId)
    if (invoiceResponse.error) throw new Error(invoiceResponse.error?.toString())
    if (!invoiceResponse.invoice) throw new Error(`no invoice found for ${invoiceId}`)
    const { invoice } = invoiceResponse

    const remainingSpending = account?.spendingLimit - account?.currentSpending
    if (remainingSpending < invoice.amount) throw new Error(`Limited reach, cannot pay invoice, renaming amount to spend: ${remainingSpending}, invoice amount: ${invoice.amount}`)

    // 2 Update third party vendor ...
    // Outside the scope of this project

    // 3 Add a transation
    const transationResponse = await insertTransation({
      accountId,
      invoiceId,
      vendorId: invoice.vendorId,
      amount: invoice.amount
    })
    if (transationResponse.error) throw new Error(invoiceResponse.error?.toString())

    // 4 Update invoice
    const updateInvoiceResponse = await updateInvoiceStatus(invoiceId, 'paid')
    if (updateInvoiceResponse?.error) throw new Error(invoiceResponse.error?.toString())
  } catch (error) {
    return new Error(error?.toString())
  }
}

export const activateCard = async (cardId: number) => {
  try {
    const response = await updateCardStatus(cardId, 'active')
    if (response?.error) throw new Error(response.error.toString()) 
  } catch (error) {
    return { error }
  }
}

export const deactivateCard = async (cardId: number) => {
  try {
    const response = await updateCardStatus(cardId, 'deactive')
    if (response?.error) throw new Error(response.error.toString()) 
  } catch (error) {
    return { error }
  }
}
