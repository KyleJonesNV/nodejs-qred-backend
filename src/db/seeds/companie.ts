import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  await knex('transations').del()
  await knex('invoices').del()
  await knex('vendors').del()
  await knex('cards').del()
  await knex('accounts').del()
  await knex('companies').del()

  await knex('companies').insert([
    { name: 'Company AB' },
    { name: 'Qred' },
    { name: 'Spotify' }
  ])

  await knex('accounts').insert([
    { company_id: 1, spending_limit: 10000, current_spending: 0 },
    { company_id: 2, spending_limit: 5000, current_spending: 0 },
    { company_id: 3, spending_limit: 10000, current_spending: 6777 }
  ])

  await knex('cards').insert([
    { id: 1, company_id: 1, status: 'active' },
    { id: 2, company_id: 2, status: 'active' }
  ])

  await knex('vendors').insert([{ id: 1, name: 'street food', image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fasian-street-food-vendor-cartoon-vector-36110993&psig=AOvVaw0UGlJu9paMpmoRtLa7D1am&ust=1692512468525000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDF9rWK6IADFQAAAAAdAAAAABAE' }])

  await knex('invoices').insert([
    { company_id: 1, vendor_id: 1, title: 'apples', description: 'batch of apples', due_date: '2023-10-15T00:00:00.000Z', amount: 100, status: 'paid' },
    { company_id: 1, vendor_id: 1, title: 'bananas', description: 'batch of bananas', due_date: '2023-10-15T00:00:00.000Z', amount: 100, status: 'payable' }
  ])

  await knex('transations').insert([{ account_id: 1, vendor_id: 1, invoice_id: 1, amount: 100 }])
}
