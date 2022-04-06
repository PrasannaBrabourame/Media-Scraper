/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  05 Apr 2022                                                  *
 ********************************************************************************/

/**
 * Function used to fetch data with limits
 * @async
 * @function fetchData
 * @returns {Object} Status
 */
const fetchData = () => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: [],
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_URL}fetchData`, requestOptions)
            .then(response => response.text())
            .then(result => resolve({
                success: true,
                message: 'Success! Data Fetched Successfully',
                data: JSON.parse(result).data
            }))
            .catch((e) => reject({
                success: false,
                data: e.message,
                message: 'Something Went Wrong! Please try Again'
            }));
    })
}


/**
 * Function used to get the overall count of the table
 * @async
 * @function fetchCount
 * @returns {Object} Status
 */
const fetchCount = () => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: [],
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_URL}pagenation`, requestOptions)
            .then(response => response.text())
            .then(result => resolve({
                success: true,
                message: 'Success! Data Fetched Successfully',
                data: JSON.parse(result).data.count
            }))
            .catch((e) => reject({
                success: false,
                data: e.message,
                message: 'Something Went Wrong! Please try Again'
            }));
    })
}

/**
 * Function  used to fetch data from searched text
 * @async
 * @function fetchBySearch
 * @param {String} values search values
 * @returns {Object} Status
 */
const fetchBySearch = (values) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({ values }),
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_URL}fetchByTextData`, requestOptions)
            .then(response => response.text())
            .then(result => resolve({
                success: true,
                message: 'Success! Data Fetched Successfully',
                data: JSON.parse(result)
            }))
            .catch((e) => reject({
                success: false,
                data: e.message,
                message: 'Something Went Wrong! Please try Again'
            }));
    })
}

/**
 * Function used to get the previous and next values from the table with limits
 * @async
 * @function fetchByPage
 * @param {Object} params object has values - search value, offset from, is from search text or not
 * @returns {Object} Status
 */
const fetchByPage = (values) => {
    return new Promise((resolve, reject) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(values),
            redirect: 'follow'
        };

        fetch(`${process.env.REACT_APP_URL}pagenationQuery`, requestOptions)
            .then(response => response.text())
            .then(result => resolve({
                success: true,
                message: 'Success! Data Fetched Successfully',
                data: JSON.parse(result).data
            }))
            .catch((e) => reject({
                success: false,
                data: e.message,
                message: 'Something Went Wrong! Please try Again'
            }));
    })
}



export { fetchData, fetchCount, fetchBySearch, fetchByPage }