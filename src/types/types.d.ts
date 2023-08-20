type Company = {
  id: Number
  name: String
}

type Invoice = {
  id: Number
  title: String
  description: String
  dueDate: String
  status: String
  amount: Number
  vendorId: Number
  vendorName: String
  vendorImage: String
}

type NewInvoice = {
  companyId: Number
  title: String
  description: String
  dueDate: String
  amount: Number
  vendorId: Number
}

type Account = {
  id: Number
  spendingLimit: Number
  currentSpending: Number
}

type Transaction = {
  id: Number
  accountId: Number
  invoiceId: Number
  amount: Number
  vendorName: String
  createdAt: Date
}

type NewTransation = {
  accountId: Number
  vendorId: Number
  invoiceId: Number
  amount: Number
}

type Card = {
  id: Number
  status: String
  companyId: Number,
}

type CardActivationResult = {
  result: string
}
