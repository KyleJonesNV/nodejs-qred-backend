import request from 'supertest'

import app from '../../app'

import db from '../../db/db'

describe('Card', () => {
  afterAll(() => [
    db.destroy()
  ])

  test('get card by id', async () => {
    const id = 1
    const expectedReponse = { id: 1, status: 'active', companyId: 1, }

    const res = await request(app).get(`/api/card/${id}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.card).toStrictEqual(expectedReponse)
  })

  test('get company cards', async () => {
    const companyId = 1
    const expectedReponse = [
      { id: 1, status: 'active', companyId: 1, }
    ]

    const res = await request(app).get(`/api/card/company/${companyId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body.cards).toStrictEqual(expectedReponse)
  })

  test('activate card', async () => {
    const cardId = 2
    const expectedReponse = { result: 'success' }

    const res = await request(app).post(`/api/card/activate/${cardId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body).toStrictEqual(expectedReponse)
  })

  test('deactivate card', async () => {
    const cardId = 2
    const expectedReponse = { result: 'success' }

    const res = await request(app).post(`/api/card/deactivate/${cardId}`)

    expect(res.body.error).toBeUndefined()
    expect(res.body).toStrictEqual(expectedReponse)
  })
})
