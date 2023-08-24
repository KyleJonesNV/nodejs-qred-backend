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
    { name: 'Spotify' },
    { name: 'Small Company AB' }
  ])

  await knex('accounts').insert([
    { company_id: 1, spending_limit: 10000, current_spending: 0 },
    { company_id: 2, spending_limit: 5000, current_spending: 0 },
    { company_id: 3, spending_limit: 10000, current_spending: 6777 },
    { company_id: 4, spending_limit: 10000, current_spending: 0 }
  ])

  await knex('cards').insert([
    { id: 1, company_id: 1, status: 'active' },
    { id: 2, company_id: 2, status: 'active' },
    { id: 3, company_id: 4, status: 'deactive' }
  ])

  await knex('vendors').insert([
    { id: 1, name: 'street food', image: 'https://st2.depositphotos.com/6942046/10778/i/450/depositphotos_107780320-stock-photo-promotion-counter-on-wheels-with.jpg' },
    { id: 2, name: 'world exchange', image: 'https://assets.unenvironment.org/stockholm50/s3fs-public/2022-06/enb-logo-icon-rgb.png' },
    { id: 3, name: 'Oriflame', image: 'https://www.swedyello.com/img/se/b/1651583672-90-oriflame-cosmetics-ab.jpg' }
  ])

  await knex('invoices').insert([
    { company_id: 1, vendor_id: 1, title: 'apples', description: 'batch of apples', due_date: '2023-10-15T00:00:00.000Z', amount: 100, status: 'paid' },
    { company_id: 1, vendor_id: 1, title: 'bananas', description: 'batch of bananas', due_date: '2023-10-15T00:00:00.000Z', amount: 100, status: 'payable' },
    { company_id: 4, vendor_id: 1, title: 'bananas', description: 'batch of bananas', due_date: '2023-10-15T00:00:00.000Z', amount: 3000, status: 'payable' },
    { company_id: 4, vendor_id: 2, title: 'equipment purchase', description: 'latest equipment from supplier', due_date: '2023-10-15T00:00:00.000Z', amount: 3000, status: 'payable' },
    { company_id: 4, vendor_id: 3, title: 'training', description: 'working training', due_date: '2023-10-15T00:00:00.000Z', amount: 5000, status: 'payable' },
  ])

  await knex('transations').insert([{ account_id: 1, vendor_id: 1, invoice_id: 1, amount: 100, created_at: '2023-08-22' }])
}
