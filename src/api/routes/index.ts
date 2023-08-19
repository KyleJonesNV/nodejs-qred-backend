import { Router } from 'express'

import company from '../handlers/company'
import invoice from '../handlers/invoice'
import transactions from '../handlers/transaction'
import account from '../handlers/account'
import card from '../handlers/card'

const router = Router()

router.use('/api/company', company)
router.use('/api/invoice', invoice)
router.use('/api/transaction', transactions)
router.use('/api/account', account)
router.use('/api/card', card)

export default router
