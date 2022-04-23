const {scrapTable} = require('puppeteer-table-scraper')
const fs = require('fs')
let titles = require('./titles.json')
var allChanges = []
var perTitle = []
// process.on('warning', e => console.warn(e.stack))
require('events').EventEmitter.defaultMaxListeners = 0

titles.forEach(function(title,index){
    const url = title['scrape-url']
    const tableSelector = '.sortable'

    scrapTable(url, tableSelector, true, 'json')
        .then(data => { tableData(data.resultData) } )
        .catch(err => { console.log(err) } )
    
    function tableData(data) {
        let changes = JSON.parse(JSON.stringify(data))
        changes = JSON.parse(changes)
        // console.log(typeof(changes))
        changes.forEach(function(change){
            change.data = title
            allChanges.push(change)
            // console.log(change)
        })
        perTitle.push(changes)

        }

})

setTimeout(function() {
    fs.writeFile(`./changes.json`, JSON.stringify(allChanges), err => {
        if (err) {
        console.error(err)
        return
        }
    })
    fs.writeFile(`./per-title.json`, JSON.stringify(perTitle), err => {
        if (err) {
        console.error(err)
        return
        }
    })
    const cities = [...new Set(allChanges.map(item => item["Championship_change_Location"]))]
    fs.writeFile(`./cities.json`, JSON.stringify(cities), err => {
        if (err) {
        console.error(err)
        return
        }
    })
},30000)