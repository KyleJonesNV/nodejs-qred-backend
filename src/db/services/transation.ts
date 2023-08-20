import db from '../db'

export const getTransaction = async (transationId: Number) => {
  try {
    const [transation] = await db('transations')      
      .join('vendors', 'transations.vendor_id', '=', 'vendors.id')      
      .where('transations.id', transationId)
      .select({
        id: 'transations.id',
        accountId: 'transations.account_id',
        invoiceId: 'transations.invoice_id',
        amount: 'transations.amount',
        vendorName: 'vendors.name',
        createdAt: 'created_at'
     })

    return { transation }
  } catch (error) {
    return { error }
  }
}

export const getTransactionsForCompany = async (accountId: Number) => {
  try {
    const transations = await db('transations')
      .join('vendors', 'transations.vendor_id', '=', 'vendors.id')
      .where('account_id', accountId)
      .select({
        id: 'transations.id',
        accountId: 'transations.account_id',
        invoiceId: 'transations.invoice_id',
        amount: 'transations.amount',
        vendorName: 'vendors.name',
        createdAt: 'created_at'
     })

    return { transations }
  } catch (error) {
    return { error }
  }
}

export const insertTransation = async (newTransation: NewTransation) => {
  try {
    const [transation] = await db('transations')
      .insert({
        account_id: newTransation.accountId,
        invoice_id: newTransation.invoiceId,
        vendor_id: newTransation.vendorId,
        amount: newTransation.amount
      })
      .returning('*')

    return { transation }
  } catch (error) {
    return { error }
  }
}