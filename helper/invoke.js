/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  05 Apr 2022                                                  *
 ********************************************************************************/

const { open, query, close } = require('../db/index');

/**
 * Function used to get the overall count of the table
 * @async
 * @function pagenation
 * @returns {Object} Status
 */
const pagenation = async () => {
    try {
        const queryText = 'SELECT count(*) AS exact_count FROM scrapper'
        const pool = open()
        const res = await query(queryText, undefined, pool)
        await close(pool)
        return {
            success: true, data: {
                count: Number(res.rows[0].exact_count)
            }, message: `Success! Data Fetched Successfully`
        }
    } catch (error) {
        return { success: false, message: `Failed! Data Fetching Failed` }
    }
}

/**
 * Function used to fetch data with limits
 * @async
 * @function fetchData
 * @returns {Object} Status
 */
const fetchData = async () => {
    try {
        const queryText = 'SELECT * FROM scrapper LIMIT 8'
        const pool = open()
        const res = await query(queryText, undefined, pool)
        await close(pool)
        return {
            success: true, data: res.rows, message: `Success! Data Fetched Successfully`
        }
    } catch (error) {
        return { success: false, message: `Failed! Data Fetching Failed` }
    }
}

/**
 * Function  used to fetch data from searched text
 * @async
 * @function searchByText
 * @param {String} values search values
 * @returns {Object} Status
 */
const searchByText = async (values) => {
    try {
        const queryText = `SELECT * FROM scrapper WHERE tags LIKE '%${values}%' LIMIT 8`
        const pool = open()
        const res = await query(queryText, undefined, pool)
        const count = await query(`SELECT count(*) AS exact_count FROM scrapper WHERE tags LIKE '%${values}%'`, undefined, pool)
        await close(pool)
        return {
            success: true, data: {
                data: res.rows,
                count: Number(count.rows[0].exact_count)
            }, message: `Success! Data Fetched Successfully`
        }
    } catch (error) {
        return { success: false, message: `Failed! Data Fetching Failed` }
    }
}


/**
 * Function used to get the previous and next values from the table with limits
 * @async
 * @function pagenationQuery
 * @param {Object} params object has values - search value, offset from, is from search text or not
 * @returns {Object} Status
 */
const pagenationQuery = async (params) => {
    try {
        let queryText
        if (params.search) {
            queryText = `SELECT * FROM scrapper WHERE tags LIKE '%${params.values}%' LIMIT 8 OFFSET ${params.from}`
        } else {
            queryText = `SELECT * FROM scrapper LIMIT 8 OFFSET ${params.from}`
        }
        const pool = open()
        const res = await query(queryText, undefined, pool)
        await close(pool)
        return {
            success: true, data: res.rows, message: `Success! Data Fetched Successfully`
        }
    } catch (error) {
        return { success: false, message: `Failed! Data Fetching Failed` }
    }
}


module.exports = { pagenation, fetchData, searchByText, pagenationQuery }