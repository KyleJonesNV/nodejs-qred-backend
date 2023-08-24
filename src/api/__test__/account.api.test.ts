import request from 'supertest'

import app from '../../app'

import db from '../../db/db'

describe('Account', () => {
  afterAll(() => [
    db.destroy()
  ])

  test('get account by id', async () => {
    const id = 1
    const expectedReponse = {
      id: 1,
      currentSpending: 0,
      spendingLimit: 10000
    }

    const res = await request(app).get(`/api/account/${id}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.account).toStrictEqual(expectedReponse)
  })

  test('get company accounts', async () => {
    const companyId = 1
    const expectedReponse = [{
      id: 1,
      currentSpending: 0,
      spendingLimit: 10000
    }]

    const res = await request(app).get(`/api/account/company/${companyId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.accounts).toStrictEqual(expectedReponse)
  })

  test('unknown id', async () => {
    const id = -1
    const expectedReponse = {
      error: 'unknown id'
    }

    const res = await request(app).get(`/api/account/${id}`)

    expect(res.body).toEqual(expectedReponse)
  })
})
