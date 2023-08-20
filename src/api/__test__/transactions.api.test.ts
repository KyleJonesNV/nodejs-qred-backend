import request from 'supertest'

import app from '../../app'

import db from '../../db/db'

describe('Transaction', () => {
  afterAll(() => [
    db.destroy()
  ])

  test('get transaction by id', async () => {
    const id = 1
    const expectedReponse = { id: 1, accountId: 1, invoiceId: 1, amount: 100, vendorName: 'street food', createdAt: new Date('2023-08-22').toISOString() }

    const res = await request(app).get(`/api/transaction/${id}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.transation).toStrictEqual(expectedReponse)
  })

  test('get company transactions', async () => {
    const companyId = 1
    const expectedReponse = [{ id: 1, accountId: 1, invoiceId: 1, amount: 100, vendorName: 'street food', createdAt: new Date('2023-08-22').toISOString() }]

    const res = await request(app).get(`/api/transaction/company/${companyId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.transations).toStrictEqual(expectedReponse)
    
  })
})
