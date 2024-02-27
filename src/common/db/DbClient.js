// https://node-postgres.com/apis/pool
const { Pool } = require('pg')

const DbClientPool = new Pool({
  host: `${import.meta.env.VITE_DB_HOST}`,
  database: `${import.meta.env.VITE_DB_DATABASE}`,
  user: `${import.meta.env.VITE_DB_USERNAME}`,
  password: `${import.meta.env.VITE_DB_PASSWORD}`,
  port: import.meta.env.VITE_DB_PORT,
  max: 5
})

// 트랙잭션 필요 시 추가
// 트랜잭션 docs 링크 : https://node-postgres.com/features/transactions
// getDbClient
/*
export const getClient = async () => {
  const client = await pool.connect()
  const query = client.query
  const release = client.release
  // set a timeout of 5 seconds, after which we will log this client's last query
  const timeout = setTimeout(() => {
    console.error('A client has been checked out for more than 5 seconds!')
    console.error(`The last executed query on this client was: ${client.lastQuery}`)
  }, 5000)
  // monkey patch the query method to keep track of the last query executed
  client.query = (...args) => {
    client.lastQuery = args
    return query.apply(client, args)
  }
  client.release = () => {
    // clear our timeout
    clearTimeout(timeout)
    // set the methods back to their old un-monkey-patched version
    client.query = query
    client.release = release
    return release.apply(client)
  }
  return client
}
*/

const dbClientQuery = async (text, params) => {
  const start = Date.now()
  const res = await DbClientPool.query(text, params)

  const duration = Date.now() - start
  console.log('executed query', { text, duration, rows: res.rowCount })
  return res
}

const endDbClientPool = () => {
  DbClientPool.end()
}

export { dbClientQuery, endDbClientPool }
