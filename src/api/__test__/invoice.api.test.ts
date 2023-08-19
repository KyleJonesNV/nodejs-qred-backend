import request from 'supertest'

import app from '../../app'

describe('Invoice', () => {
  test('get invoice by id', async () => {
    const id = 1
    const expectedReponse: Invoice = {
      id: 1,
      title: 'apples',
      description: 'batch of apples',
      dueDate: '2023-10-14T22:00:00.000Z',
      status: 'paid',
      amount: 100.0,
      vendorId: 1,
      vendorName: 'street food',
      vendorImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fasian-street-food-vendor-cartoon-vector-36110993&psig=AOvVaw0UGlJu9paMpmoRtLa7D1am&ust=1692512468525000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDF9rWK6IADFQAAAAAdAAAAABAE'
    }

    const res = await request(app).get(`/api/invoice/${id}`)

    expect(res.body.invoice).toStrictEqual(expectedReponse)
  })

  test('get invoices for company', async () => {
    const companyID = 1
    const expectedReponse: Invoice[] = [
      {
        id: 1,
        title: 'apples',
        description: 'batch of apples',
        dueDate: "2023-10-14T22:00:00.000Z",
        status: 'paid',
        amount: 100.0,
        vendorId: 1,
        vendorName: 'street food',
        vendorImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fasian-street-food-vendor-cartoon-vector-36110993&psig=AOvVaw0UGlJu9paMpmoRtLa7D1am&ust=1692512468525000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDF9rWK6IADFQAAAAAdAAAAABAE'
      },
      {
        id: 2,
        title: 'bananas',
        description: 'batch of bananas',
        dueDate: "2023-10-14T22:00:00.000Z",
        status: 'payable',
        amount: 100.0,
        vendorId: 1,
        vendorName: 'street food',
        vendorImage: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vectorstock.com%2Froyalty-free-vector%2Fasian-street-food-vendor-cartoon-vector-36110993&psig=AOvVaw0UGlJu9paMpmoRtLa7D1am&ust=1692512468525000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCKDF9rWK6IADFQAAAAAdAAAAABAE'
      }
    ]

    const res = await request(app).get(`/api/invoice/company/${companyID}`)
    expect(res.body.invoices).toStrictEqual(expectedReponse)
  })

  test('add and pay invoice', async () => {
    const newInvoice: NewInvoice = {
      companyId: 2,
      title: 'carrot',
      description: 'batch of carrots',
      dueDate: '2023-10-14T22:00:00.000Z',
      amount: 100.0,
      vendorId: 1
    }

    const accountId = 2

    let res = await request(app).post(`/api/invoice/`).send(newInvoice)
    expect(res.body.result).toBe('success')
    expect(typeof res.body.id).toBe('number')
    const invoiceId = res.body.id

    res = await request(app).get(`/api/invoice/${invoiceId}`)
    expect(res.body.invoice.title).toBe('carrot')
    expect(res.body.invoice.status).toBe('payable')

    res = await request(app).post(`/api/invoice/pay`).send({accountId, invoiceId})
    expect(res.body.error).toBeUndefined()
    expect(res.body.result).toBe('success')

    res = await request(app).get(`/api/invoice/${invoiceId}`)
    expect(res.body.invoice.title).toBe('carrot')
    expect(res.body.invoice.status).toBe('paid')
  })
})
