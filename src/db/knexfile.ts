import 'dotenv/config'
import type { Knex } from 'knex'
import pg from 'pg'

pg.types.setTypeParser(pg.types.builtins.NUMERIC, parseFloat);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 2,
      max: 5
    },
    migrations: {
      tableName: process.env.DB_NAME
    }
  }
}

export default config
