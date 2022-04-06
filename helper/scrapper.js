/*********************************************************************************
 *                                                                              *
 * Author       :  Prasanna Brabourame                                          *
 * Version      :  1.0.0                                                        *
 * Date         :  04 Apr 2022                                                  *
 ********************************************************************************/

const puppeteer = require('puppeteer');
const { open, query, close } = require('../db/index');


const scarapper = async (scarpURL) => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(scarpURL, { waitUntil: 'domcontentloaded' });
        const imageLinks = await page.$$eval('img', elements => elements.map((element) => { return [element.src, 'img', element.alt ? element.alt : 'NA', element.src.split('/').pop().split('.')[1]] }));
        const videoLinks = await page.evaluate(() => Array.from(document.querySelectorAll('video > source'), (element) => { return [element.src, 'video', element.src.split('/').pop().split('.')[0], element.type] }));
        const mergelinks = [...imageLinks, ...videoLinks]
        await browser.close();
        const queryText = 'INSERT INTO scrapper (url, linkType,tags,fType) VALUES ($1, $2, $3, $4)'
        const pool = open()
        for (const item of mergelinks) {
            const res = await query(queryText, item, pool)
        }
        await close(pool)
        return { success: true, message: `Success! Data Scarpped Successfully for ${scarpURL}` }
    } catch (e) {
        await browser.close();
        return { success: false, message: `Failed! Data Scarpped Failed for ${scarpURL}` }
    }
}

module.exports = {
    scarapper
}