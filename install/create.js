/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  04 Apr 2022                                                  *
 ********************************************************************************/

const { open, query, close } = require('../db/index');
 /**
  * Function used to create table on Postgres
  * @async
  * @function createDB
  */
const createDB = async (params) => {
    try {
        const queryText = `CREATE TABLE scrapper(
            id_scrap serial NOT NULL PRIMARY KEY,
            url varchar NOT NULL,
            linkType varchar NOT NULL,
            tags varchar NOT NULL,
            fType varchar NOT NULL
            )`
        const pool = open()
        const res = await query(queryText, undefined, pool)
        console.log(res)
        await close(pool)
    } catch (err) {
        console.log(err)
    }
}

createDB()