import request from 'supertest'

import app from '../../app'

describe('Account', () => {
  test('get account by id', async () => {
    const id = 1
    const expectedReponse: Account = {
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
    const expectedReponse: Account[] = [{
      id: 1,
      currentSpending: 0,
      spendingLimit: 10000
    }]

    const res = await request(app).get(`/api/account/company/${companyId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.accounts).toStrictEqual(expectedReponse)
  })
})
