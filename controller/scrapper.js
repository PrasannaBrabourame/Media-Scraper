/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  04 Apr 2022                                                  *
 ********************************************************************************/

const { scarapper } = require('../helper/scrapper')
const dataScrapper = (req, res, next) => {
    try {
        if (req.headers['x-application-id'] === process.env.APPLICATION_ID && req.headers['x-rest-api-key'] === process.env.REST_API_KEY) {
            res.status(200).json({
                success: true,
                message: 'Successfully Authenticated'
            })
            next(scrapperTrigger(req.body))
        } else {
            res.status(403).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            })
        }
    } catch (e) {
        res.status(400).json({
            success: false,
            message: 'Something Went Wrong! Please try Again'
        })
    }
}

const scrapperTrigger = async (weburlsArr) => {
    Promise.all(weburlsArr.map(async (weburl) => {
        await scarapper(weburl)
    }));
}

module.exports = {
    dataScrapper
}
