/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  04 Apr 2022                                                  *
 ********************************************************************************/

require('dotenv').config()
const express = require('express')
const path = require('path')
const qs = require('qs')
const fs = require('fs')
const logger = require('morgan')
const port = process.env.PORT
const cluster = require("cluster");
const totalCPUs = require("os").cpus().length;
const { dataScrapper } = require('./controller/scrapper')
const { reqPagenation, reqFetchData, reqFetchByTextData, reqPagenatedQuery } = require('./controller/invoke')



if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < totalCPUs; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });
} else {
    const app = express()
    //app.use(cors(corsOptionsDelegate))
    //app.use(cors())
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    //app.use(cookieParser())
    app.use(express.static('public', { maxAge: 31557600000 }))
    app.use(express.static('client', { maxAge: 31557600000 }))
    app.use(logger('combined', { stream: accessLogStream }))
    var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    app.use(express.static('front-end/public', { maxAge: 31557600000 }))
    app.use(express.static('front-end/release', { maxAge: 31557600000 }))
    
    app.get("/app", (req, res) => {
        res.sendFile(path.join(`${__dirname}/front-end`, "release", "index.html"));
    });

    app.post(`/scrapData`, dataScrapper)
    app.post('/pagenation', reqPagenation)
    app.post('/fetchData', reqFetchData)
    app.post('/fetchByTextData', reqFetchByTextData)
    app.post('/pagenationQuery', reqPagenatedQuery)



    app.listen(port, () => {
        console.log(`Media Scraper Server is listening on port ${port}`)
    })

}

