var Pool = require('pg').Pool;

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT
})

exports.pool = pool;


exports.queryHandler = async function (queryStr, queryParams) {
    try {
        return await pool.query(queryStr, queryParams)
    } catch (error) {
        console.error("Error in queryHandler config :", error)
        throw Error(error)
    }
}