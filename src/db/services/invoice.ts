import knex from '../db'

export const getInvoice = async (id: Number) => {
  try {
    const [invoice] = await knex('invoices')
      .join('vendors', 'invoices.vendor_id', '=', 'vendors.id')
      .select({
        id: 'invoices.id',
        title: 'invoices.title',
        description: 'invoices.description',
        dueDate: 'invoices.due_date',
        amount: 'invoices.amount',
        status: 'invoices.status',
        vendorId: 'vendors.id',
        vendorName: 'vendors.name',
        vendorImage: 'vendors.image'
      })
      .where('invoices.id', id)

    return { invoice }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export const getInvoiceForCompany = async (companyId: Number) => {
  try {
    const invoices = await knex('invoices')
      .join('vendors', 'invoices.vendor_id', '=', 'vendors.id')
      .select({
        id: 'invoices.id',
        title: 'invoices.title',
        description: 'invoices.description',
        dueDate: 'invoices.due_date',
        amount: 'invoices.amount',
        status: 'invoices.status',
        vendorId: 'vendors.id',
        vendorName: 'vendors.name',
        vendorImage: 'vendors.image'
      })
      .where('invoices.company_id', companyId)

    if (invoices.length === 0) return { invoices: [] }
    return { invoices }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export const insertInvoice = async (invoice: NewInvoice, status: string) => {
  try {
    const [insertedInvoice] = await knex('invoices')
      .insert({
        company_id: invoice.companyId,
        vendor_id: invoice.vendorId,
        title: invoice.title,
        description: invoice.description,
        due_date: invoice.dueDate,
        amount: invoice.amount,
        status: status
      })
      .returning('id')

    return { id: insertedInvoice.id }
  } catch (error) {
    console.log(error)
    return { error }
  }
}

export const updateInvoiceStatus = async (id: Number, status: string) => {
  try {
    await knex('invoices').update('status', status).where('id', id)
  } catch (error) {
    console.log(error)
    return { error }
  }
}
