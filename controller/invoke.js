/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  05 Apr 2022                                                  *
 ********************************************************************************/
const { pagenation, fetchData, searchByText, pagenationQuery } = require('../helper/invoke');


/**
 * Function used to get the overall count of the table
 * @async
 * @function reqPagenation
 * @returns {Object} Status
 */
const reqPagenation = async (req, res, next) => {
    try {
        const response = await pagenation()
        if (response.success) {
            res.status(200).json({
                success: true,
                data: {
                    count: response.data.count
                },
                message: 'Successfully Authenticated'
            })
        } else {
            throw new Error(response.message)
        }
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong! Please try Again'
        })
    }
}

/**
 * Function used to fetch data with limits
 * @async
 * @function reqFetchData
 * @returns {Object} Status
 */
const reqFetchData = async (req, res, next) => {
    try {
        const response = await fetchData()
        if (response.success) {
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'Successfully Authenticated'
            })
        } else {
            throw new Error(response.message)
        }
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong! Please try Again'
        })
    }
}

/**
 * Function  used to fetch data from searched text
 * @async
 * @function reqFetchByTextData
 * @param {String} values search values
 * @returns {Object} Status
 */
const reqFetchByTextData = async (req, res, next) => {
    try {
        const response = await searchByText(req.body.values)
        if (response.success) {
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'Successfully Authenticated'
            })
        } else {
            throw new Error(response.message)
        }
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong! Please try Again'
        })
    }
}

/**
 * Function used to get the previous and next values from the table with limits
 * @async
 * @function reqPagenatedQuery
 * @param {Object} params object has values - search value, offset from, is from search text or not
 * @returns {Object} Status
 */
const reqPagenatedQuery = async (req, res, next) => {
    try {
        const response = await pagenationQuery(req.body)
        if (response.success) {
            res.status(200).json({
                success: true,
                data: response.data,
                message: 'Successfully Authenticated'
            })
        } else {
            throw new Error(response.message)
        }
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong! Please try Again'
        })
    }
}

module.exports = { reqPagenation, reqFetchData, reqFetchByTextData, reqPagenatedQuery }