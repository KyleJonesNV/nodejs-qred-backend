import 'dotenv/config'
import Knex from 'knex'
import config from './knexfile'

const db = Knex(config.development)

export default db
