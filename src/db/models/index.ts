export interface Company {
  id: number
  name: string
  created_at: string
  updated_at: string
}

export interface Account {
  id: number
  company_id: number
  spending_limit: number
  current_spending: number
}

export interface Card {
  id: number
  company_id: number
  status: string
}

export interface Vendor {
  id: number
  name: string
  image: string
}

export interface Invoice {
  id: number
  company_id: number
  vendor_id: number
  title: string
  description: string
  due_date: Date
  amount: number
  status: string
}

export interface Transation {
  id: number
  account_id: number
  invoice_id: number
  amount: number
}
