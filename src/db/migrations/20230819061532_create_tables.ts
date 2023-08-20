import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('companies', (table) => {
      table.increments('id')
      table.string('name', 255).notNullable().unique()
      table.timestamps()
    })
    .createTable('accounts', (table) => {
      table.increments('id')
      table.integer('company_id').unsigned().notNullable()
      table.decimal('spending_limit')
      table.decimal('current_spending')

      table.foreign('company_id').references('id').inTable('companies')
    })
    .createTable('cards', (table) => {
      table.increments('id')
      table.integer('company_id').unsigned().notNullable()
      table.string('status', 255)

      table.foreign('company_id').references('id').inTable('companies')
    })
    .createTable('vendors', (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.text('image')
    })
    .createTable('invoices', (table) => {
      table.increments('id')
      table.integer('company_id').unsigned().notNullable()
      table.integer('vendor_id').unsigned().notNullable()
      table.string('title', 255).notNullable()
      table.string('description', 255)
      table.date('due_date')
      table.decimal('amount').notNullable()
      table.string('status', 255)
      table.timestamps(true, true)

      table.foreign('company_id').references('id').inTable('companies')
      table.foreign('vendor_id').references('id').inTable('vendors')
    })
    .createTable('transations', (table) => {
      table.increments('id')
      table.integer('account_id').unsigned().notNullable()
      table.integer('invoice_id').unsigned().notNullable()
      table.integer('vendor_id').unsigned().notNullable()
      table.decimal('amount')
      table.timestamps(true, true)

      table.foreign('account_id').references('id').inTable('accounts')
      table.foreign('invoice_id').references('id').inTable('invoices')
      table.foreign('vendor_id').references('id').inTable('vendors')
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('transations')
    .dropTable('invoices')
    .dropTable('vendors')
    .dropTable('accounts')    
    .dropTable('cards')
    .dropTable('companies')
}
