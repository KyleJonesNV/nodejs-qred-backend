import { Company } from '../models'
import db from '../db'

export const getCompany = async (id: number) => {
  try {
    const company = await db<Company>('companies').select({ id: 'id', name: 'name' }).where({ id })
    if (company.length > 1) return { error: 'multiple companies found with the same id' }
    return company[0]
  } catch (error) {
    return { error }
  }
}

export const getCompanyByName = async (name: string) => {
  try {
    const company = await db<Company>('companies').where('name', name).select({ id: 'id', name: 'name' })
    if (company.length > 1) return { eror: 'multiple companies found with the same name' }
    return company[0]
  } catch (error) {
    return { error }
  }
}

export const insertCompany = async (name: string) => {
  try {
    await db<Company>('companies')
      .insert({
        name: name
      })
      .onConflict('name')
      .ignore()

    return { result: 'success' }
  } catch (error) {
    return { error }
  }
}
