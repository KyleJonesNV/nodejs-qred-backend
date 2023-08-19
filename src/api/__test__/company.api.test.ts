import request from 'supertest'

import app from '../../app'

describe('Company', () => {
  test('get company by id', async () => {
    const id = 1
    const expectedResponse: Company = {
      id: 1,
      name: 'Company AB'
    }
    const res = await request(app).get(`/api/company/${id}`)
    expect(res.body.company).toEqual(expectedResponse)
  })

  test('get company by name', async () => {
    const companyName = 'Company AB'
    const expectedResponse: Company = {
      id: 1,
      name: 'Company AB'
    }
    const res = await request(app).get(`/api/company/name/${companyName}`)
    expect(res.body.company).toEqual(expectedResponse)
  })

  test('add company', async () => {
    const newCompany = {
      name: 'KWJ AB'
    }
    
    let res = await request(app).post('/api/company/').send(newCompany).set('Accept', 'application/json')
    expect(res.body.result).toEqual('success')

    // fetch inserted company
    res = await request(app).get(`/api/company/name/${newCompany.name}`)
    expect(res.body.company.name).toEqual(newCompany.name)
  })
  
  
})
