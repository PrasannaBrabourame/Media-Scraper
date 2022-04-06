/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  04 Apr 2022                                                  *
 ********************************************************************************/

require('dotenv').config()
const { Pool } = require('pg')

/**
 * Helper function for database 
 * @async
 * @returns {function} Status
 */
module.exports = {
    open: () => new Pool({
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASS,
        port: process.env.PGPORT,
    }),
    query: (text, params, pool) => pool.query(text, params),
    close: (pool) => pool.end()
}