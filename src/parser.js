let changes = []
let calendar = []
let ranks = []
let map = []
let current = []
let active = []
let averageReign = 0
setTimeout(function() {
    if (averageReign > 0) {
        let averageReignElem = document.querySelector('.average-reign')
        let averageTime = Math.floor(averageReign / active.length)
        averageReignElem.innerText = `Average reign: ${averageTime} days`
    }
},1000)

let dateObj = {
    month: moment().format('MMM'),
    day: moment().format('DD')
}

fetch('./changes.json')
.then(res => res.json())
.then(data => {

    data.forEach(function(item) {
        if (item['Champion'].includes('(')) {
            let regex = /\(([^()]*)\)/g
            item['Champion'] = item['Champion'].replace(regex,'')
            item['Champion'] = item['Champion'].replace(regex,'')
        }

        if (item['Championship_change_Date'].includes('or ')) {
            item['Championship_change_Date'] = item['Championship_change_Date'].replace('or 26','')
        }
    
        if (item['Championship_change_Date'].includes('[')) {
            item['Championship_change_Date'] = item['Championship_change_Date'].replace(/\s*\[.*?\]\s*/g,'')
        }
        
        item.sortDate = moment(item['Championship_change_Date']).format("YYYY-MM-DD")
        item.sortYear = moment(item['Championship_change_Date']).format("YYYY")
        item.sortMonth = moment(item['Championship_change_Date']).format("MMM")
        item.sortMonthNum = moment(item['Championship_change_Date']).format("MM")
        item.sortDay = moment(item['Championship_change_Date']).format("DD")

        if (item.data.code === 'wwe-us') {
            if (item['No_'] <= 91) {
                item.data.code = 'wcw-us'
                item.data.promotion = 'WCW'
            }
            if (parseInt(item.sortYear) < 2001) {
                item.data.code = 'wcw-us'
                item.data.promotion = 'WCW'
            }
        }
        if (item.data.code === 'wcw-us') {
            if (item['No_'] <= 37) {
                item.data.code = 'nwa-us'
                item.data.promotion = 'NWA'
            }
            if (parseInt(item.sortYear) < 1989) {
                item.data.code = 'nwa-us'
                item.data.promotion = 'NWA'
            }
        }
        if (item.data.code === 'aew-ftw') {
            if (parseInt(item.sortYear) < 2019) {
                item.data.code = 'ecw-few'
                item.data.promotion = 'ECW'
                item.data.active = false
            }
        }
        if (item.data.code === 'wwe-ecw') {
            if (item['No_'] <= 34) {
                item.data.code = 'ecw-world'
                item.data.promotion = 'ECW'
                item.data.name = 'World'
                item.data['short-name'] = 'world'
            }
            if (parseInt(item.sortYear) < 2002) {
                item.data.code = 'ecw-world'
                item.data.promotion = 'ECW'
                item.data.name = 'World'
                item.data['short-name'] = 'world'
            }
        }
        if (item.data.code === 'wcw-tag') {
            if (item['No_'] <= 137) {
                item.data.code = 'wcw-tag'
                item.data.promotion = 'WCW'
                item.data.name = 'Tag'
                item.data['short-name'] = 'tag'
            }
            if (parseInt(item.sortYear) < 2001) {
                item.data.code = 'wcw-tag'
                item.data.promotion = 'WCW'
                item.data.name = 'Tag'
                item.data['short-name'] = 'tag'
            }
            if (item['No_'] <= 55) {
                item.data.code = 'nwa-tag'
                item.data.promotion = 'NWA'
                item.data.name = 'Tag'
                item.data['short-name'] = 'tag'
            }
            if (parseInt(item.sortYear) < 1990) {
                item.data.code = 'nwa-tag'
                item.data.promotion = 'NWA'
                item.data.name = 'Tag'
                item.data['short-name'] = 'tag'
            }
        }
    })
    
    changes = JSON.parse(JSON.stringify(data))
    changes = data.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)
    
    calendar = JSON.parse(JSON.stringify(data))
    ranks = JSON.parse(JSON.stringify(data))
    
    map = JSON.parse(JSON.stringify(data))
    
})

fetch('./per-title.json')
.then(res => res.json())
.then(data => {
    current = JSON.parse(JSON.stringify(data))
    current = data.sort((a, b) => (a.sortDate < b.sortDate) ? 1 : -1)
    current.forEach(function(each,index){
        if (each[0].data.active) {
            active.push(each[each.length - 1])
        }
    })
    active.forEach(function(each){
        let changeDate = moment(each['Championship_change_Date']).format("DD MMM YYYY")
        each.daysSince = countDays(changeDate)
        // console.log(each.daysSince)
    })
    drawActiveBoard(true)
})

setTimeout(function(){
    changes.forEach(function(change, index) {

        let changesContainer = document.querySelector('.changes-table')

        let entry = document.createElement('div')
        entry.classList.add('changes-entry') 
        
        let titleElem = document.createElement('div')
        let titlePromElem = document.createElement('span')
        let titleNameElem = document.createElement('span')
        titlePromElem.innerText = change.data.promotion
        titleNameElem.innerText = change.data['short-name'].toUpperCase()
        titleElem.classList.add('title')
        titlePromElem.classList.add('tag')
        titlePromElem.classList.add(`${change.data.promotion.toLowerCase()}-tag`)
        titleNameElem.classList.add('tag')
        titleNameElem.classList.add(`${change.data.promotion.toLowerCase()}-tag`)
        titleNameElem.classList.add(`${change.data.promotion.toLowerCase()}-${change.data['short-name'].replace('/','').toLowerCase()}-tag`)
        titleElem.appendChild(titlePromElem)
        titleElem.appendChild(titleNameElem)
        entry.appendChild(titleElem)
    
        let dateElem = document.createElement('div')
        dateElem.innerText = moment(change['Championship_change_Date']).format("DD MMM YYYY")
        dateElem.classList.add('date')
        entry.appendChild(dateElem)


        let nameElem = document.createElement('div')
        nameElem.innerText = change['Champion']
        nameElem.classList.add('name')
        entry.appendChild(nameElem)

        let locElem = document.createElement('div')
        locElem.innerText = change['Championship_change_Location']
        locElem.classList.add('location')
        entry.appendChild(locElem)

        let eventElem = document.createElement('div')
        eventElem.innerText = change['Championship_change_Event']
        eventElem.classList.add('event')
        entry.appendChild(eventElem)
        
        changesContainer.appendChild(entry)
    })
    returnDateChanges()
},1000)

function returnDateChanges() {
    let today = document.querySelector('.todays-date')
    today.innerText = `${moment(`2020-${dateObj.month}-01`).format('MMM')} ${moment(`2020-Jan-${dateObj.day}`).format('Do')}`

    let onThisDate = document.querySelector('.on-this-date')

    let filteredCalendar = calendar.filter(item =>
        (item.sortMonth == dateObj.month) && 
        (item.sortDay == dateObj.day)
        )
    while (onThisDate.firstChild) {
        onThisDate.firstChild.remove()
    }
    filteredCalendar.forEach(function(change) {
    let listItem = document.createElement('li')

    let year = document.createElement('div')
    year.classList.add('calendar-year')
    year.innerText = change.sortYear
    listItem.appendChild(year)

    let titleElem = document.createElement('div')
    titleElem.classList.add('calendar-title')

    let titlePromElem = document.createElement('span')
    titlePromElem.innerText = change.data.promotion
    titlePromElem.classList.add('tag')
    titlePromElem.classList.add(`${change.data.promotion.toLowerCase()}-tag`)
    
    let titleNameElem = document.createElement('span')
    titleNameElem.innerText = change.data['short-name'].toUpperCase()
    titleNameElem.classList.add('tag')
    titleNameElem.classList.add(`${change.data.promotion.toLowerCase()}-tag`)
    titleNameElem.classList.add(`${change.data.promotion.toLowerCase()}-${change.data['short-name'].replace('/','').toLowerCase()}-tag`)
    
    titleElem.appendChild(titlePromElem)
    titleElem.appendChild(titleNameElem)
    listItem.appendChild(titleElem)

    onThisDate.appendChild(listItem)

    let nameElem = document.createElement('div')
    nameElem.innerText = change['Champion']
    nameElem.classList.add('calendar-name')
    listItem.appendChild(nameElem)
    })
}

function changeMonth(month) {
    dateObj.month = month
    returnDateChanges()
    let calendarDayFilter = document.querySelectorAll('.calendar-day-filters li')
    let calendarMonthFilter = document.querySelectorAll('.calendar-month-filters li')
    calendarDayFilter.forEach(function(each){
        each.classList.remove('inactive')
    })
    calendarMonthFilter[1].addEventListener('click',function(){
        calendarDayFilter[29].classList.add('inactive')
        if (dateObj.day == '30') {
            changeDay(29)
        }
        calendarDayFilter[30].classList.add('inactive')
        if (dateObj.day == '31') {
            changeDay(29)
        }
    })
    calendarMonthFilter[3].addEventListener('click',function(){
        calendarDayFilter[30].classList.add('inactive')
        if (dateObj.day == '31') {
            changeDay(30)
        }
    })
    calendarMonthFilter[5].addEventListener('click',function(){
        calendarDayFilter[30].classList.add('inactive')
        if (dateObj.day == '31') {
            changeDay(30)
        }
    })
    calendarMonthFilter[8].addEventListener('click',function(){
        calendarDayFilter[30].classList.add('inactive')
        if (dateObj.day == '31') {
            changeDay(30)
        }
    })
    calendarMonthFilter[10].addEventListener('click',function(){
        calendarDayFilter[30].classList.add('inactive')
        if (dateObj.day == '31') {
            changeDay(30)
        }
    })
}

function changeDay(day) {
    dateObj.day = day
    returnDateChanges()
}

function countDays(start) {
    const date1 = new Date(start);
    const date2 = new Date();

    // One day in milliseconds
    const oneDay = 1000 * 60 * 60 * 24;

    // Calculating the time difference between two dates
    const diffInTime = date2.getTime() - date1.getTime();

    // Calculating the no. of days between two dates
    const diffInDays = Math.round(diffInTime / oneDay);

    return diffInDays;
}

let currentDirection = document.querySelector('.current-direction')
var currentDrawDirection = true
function drawActiveBoard() {
    currentDrawDirection = !currentDrawDirection
    if (currentDrawDirection) {
        active = active.sort((a, b) => (a.daysSince < b.daysSince) ? 1 : -1)
        currentDirection.innerText = 'Sort by Most Recent'
    } else {
        active = active.sort((a, b) => (a.daysSince > b.daysSince) ? 1 : -1)
        currentDirection.innerText = 'Sort by Least Recent'
    }
    let activeChamps = document.querySelector('.active-champs-inner')
    while (activeChamps.firstChild) {
        activeChamps.firstChild.remove()
    }
    active.forEach(function(each){

        if (each['Champion'].includes('(')) {
            let regex = /\(([^()]*)\)/g
            each['Champion'] = each['Champion'].replace(regex,'')
            each['Champion'] = each['Champion'].replace(regex,'')
        }

        let entry = document.createElement('div')
        entry.classList.add('active-entry')
        
        let dateElem = document.createElement('div')
        dateElem.innerText = `${each.daysSince}d+`
        dateElem.classList.add('date')
        entry.appendChild(dateElem)
        
        let titleElem = document.createElement('div')
        let titlePromElem = document.createElement('span')
        let titleNameElem = document.createElement('span')
        titlePromElem.innerText = each.data.promotion
        titleNameElem.innerText = each.data['short-name'].toUpperCase()
        titleElem.classList.add('title')
        titlePromElem.classList.add('tag')
        titlePromElem.classList.add(`${each.data.promotion.toLowerCase()}-tag`)
        titleNameElem.classList.add('tag')
        titleNameElem.classList.add(`${each.data.promotion.toLowerCase()}-tag`)
        titleNameElem.classList.add(`${each.data.promotion.toLowerCase()}-${each.data['short-name'].replace('/','').toLowerCase()}-tag`)
        titleElem.appendChild(titlePromElem)
        titleElem.appendChild(titleNameElem)
        entry.appendChild(titleElem)
        
        let champName = document.createElement('p')
        champName.innerText = each['Champion']
        entry.appendChild(champName)
        
        activeChamps.appendChild(entry)
    })
    active.forEach(function(each){
        averageReign += each.daysSince
    })
}