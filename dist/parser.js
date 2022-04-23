let changes = []

let calendar = []

let ranks = []

let cities = []
let locData = []
let activeCity = ''
let abbreviations = {
    "AL": "Alabama",
    "AK": "Alaska",
    "AS": "American Samoa",
    "AZ": "Arizona",
    "AR": "Arkansas",
    "CA": "California",
    "CO": "Colorado",
    "CT": "Connecticut",
    "DE": "Delaware",
    "DC": "District Of Columbia",
    "FM": "Federated States Of Micronesia",
    "FL": "Florida",
    "GA": "Georgia",
    "GU": "Guam",
    "HI": "Hawaii",
    "ID": "Idaho",
    "IL": "Illinois",
    "IN": "Indiana",
    "IA": "Iowa",
    "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "ME": "Maine",
    "MH": "Marshall Islands",
    "MD": "Maryland",
    "MA": "Massachusetts",
    "MI": "Michigan",
    "MN": "Minnesota",
    "MS": "Mississippi",
    "MO": "Missouri",
    "MT": "Montana",
    "NE": "Nebraska",
    "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "MP": "Northern Mariana Islands",
    "OH": "Ohio",
    "OK": "Oklahoma",
    "OR": "Oregon",
    "PW": "Palau",
    "PA": "Pennsylvania",
    "PR": "Puerto Rico",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TN": "Tennessee",
    "TX": "Texas",
    "UT": "Utah",
    "VT": "Vermont",
    "VI": "Virgin Islands",
    "VA": "Virginia",
    "WA": "Washington",
    "WV": "West Virginia",
    "WI": "Wisconsin",
    "WY": "Wyoming"
}

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

    data.forEach(function(item, index) {
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
        if (item['Championship_change_Date'].includes('(')) {
            let regex = /\(([^()]*)\)/g
            item['Championship_change_Date'] = moment(item['Championship_change_Date'].replace(regex,''))
        }

        if (item["Championship_change_Location"].match('Red Sea')) {
            item["Championship_change_Location"] = "Red Sea"
        }

        if (item["Championship_change_Location"].includes(', British Columbia')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', British Columbia',', BC')
        }
        
        if (item["Championship_change_Location"].includes(', New Jersey')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', New Jersey',', NJ')
        }
        
        if (item["Championship_change_Location"].includes(', New Mexico')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', New Mexico',', NM')
        }
        
        if (item["Championship_change_Location"].includes(', New York')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', New York',', NY')
        }

        if (item["Championship_change_Location"].includes('New York,')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('New York,',', New York City,')
        }

        if (item["Championship_change_Location"].match('New York City')) {
            item["Championship_change_Location"] = "New York City, NY"
        }

        if (item["Championship_change_Location"].match('New York City')) {
            item["Championship_change_Location"] = "New York, NY"
        }

        if (item["Championship_change_Location"].includes(', North Carolina')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', North Carolina',', NC')
        }

        if (item["Championship_change_Location"].includes(', North Dakota')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', North Dakota',', ND')
        }

        if (item["Championship_change_Location"].includes(', Rhode Island')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Rhode Island',', RI')
        }

        if (item["Championship_change_Location"].includes(', South Carolina')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', South Carolina',', SC')
        }
        
        if (item["Championship_change_Location"].includes(', South Dakota')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', South Dakota',', SD')
        }

        if (item["Championship_change_Location"].includes(', Alabama')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Alabama',', AL')
        }
        
        if (item["Championship_change_Location"].includes(', Alberta')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Alberta',', AB')
        }

        if (item["Championship_change_Location"].includes(', Arizona')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Arizona',', AZ')
        }

        if (item["Championship_change_Location"].includes(', California')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', California',', CA')
        }

        if (item["Championship_change_Location"].includes(', Colorado')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Colorado',', CO')
        }

        if (item["Championship_change_Location"].includes(', Connecticut')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Connecticut',', CT')
        }

        if (item["Championship_change_Location"].includes(', Delaware')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Delaware',', DE')
        }


        if (item["Championship_change_Location"].includes(', Florida')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Florida',', FL')
        }

        if (item["Championship_change_Location"].includes(', Georgia')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Georgia',', GA')
        }
                
        if (item["Championship_change_Location"].includes(', Illinois')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Illinois',', IL')
        }
                   
        if (item["Championship_change_Location"].includes(', Idaho')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Idaho',', ID')
        }
                  
        if (item["Championship_change_Location"].includes(', Indiana')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Indiana',', IN')
        }
        
        if (item["Championship_change_Location"].includes(', Iowa')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Iowa',', IA')
        }
        
        if (item["Championship_change_Location"].includes(', Kentucky')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Kentucky',', KY')
        }
             
        if (item["Championship_change_Location"].includes(', Kentucky')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Kentucky',', KY')
        }
                
        if (item["Championship_change_Location"].includes(', Louisiana')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Louisiana',', LA')
        }
  
        if (item["Championship_change_Location"].includes(', Manitoba')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Manitoba',', MB')
        }
        
        if (item["Championship_change_Location"].includes(', Massachusetts')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Massachusetts',', MA')
        }
                
        if (item["Championship_change_Location"].includes(', Maryland')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Maryland',', MD')
        }
        
        if (item["Championship_change_Location"].includes(', Michigan')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Michigan',', MI')
        }
        
        if (item["Championship_change_Location"].includes(', Mississippi')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Mississippi',', MS')
        }
        
        if (item["Championship_change_Location"].includes(', Minnesota')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Minnesota',', MN')
        }

        if (item["Championship_change_Location"].includes(', Missouri')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Missouri',', MO')
        }

        if (item["Championship_change_Location"].includes('Montreal QC')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Montreal QC','Montreal, QC')
        }

        if (item["Championship_change_Location"].includes(', Nebraska')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Nebraska',', NE')
        }

        if (item["Championship_change_Location"].includes(', Nevada')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Nevada',', NV')
        }

        if (item["Championship_change_Location"].includes(', Ohio')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Ohio',', OH')
        }

        if (item["Championship_change_Location"].match('Ontario, CA')) {
            item["Championship_change_Location"] = "Ontttttario, CA"
        }

        if (item["Championship_change_Location"].match('Ontario')) {
            item["Championship_change_Location"] = "Toronto, ON"
        }

        if (item["Championship_change_Location"].match('Ontttttario, CA')) {
            item["Championship_change_Location"] = "Ontario, CA"
        }


        if (item["Championship_change_Location"].includes(', Pennsylvania')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Pennsylvania',', PA')
        }

        if (item["Championship_change_Location"].includes(', Quebec')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Quebec',', QC')
        }

        if (item["Championship_change_Location"].includes(', Tennessee')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Tennessee',', TN')
        }

        if (item["Championship_change_Location"].includes(', Texas')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Texas',', TX')
        }

        if (item["Championship_change_Location"].includes(', Utah')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Utah',', UT')
        }

        if (item["Championship_change_Location"].includes(', Virginia')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Virginia',', VA')
        }

        if (item["Championship_change_Location"].includes(', Washington')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Washington',', WA')
        }

        if (item["Championship_change_Location"].includes(', Wisconsin')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Wisconsin',', WI')
        }

        if (item["Championship_change_Location"].includes(', U.S.')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', U.S.','')
        }

        if (item["Championship_change_Location"].includes(',  U.S.')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(',  U.S.','')
        }

        if (item["Championship_change_Location"].includes(', Bahamas')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Bahamas',', The Bahamas')
        }

        if (item["Championship_change_Location"].includes(', England')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', England',', United Kingdom')
        }

        if (item["Championship_change_Location"].includes(', Scotland')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Scotland',', United Kingdom')
        }

        if (item["Championship_change_Location"].includes(', Trinidad')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Trinidad',', Trinidad And Tobago')
        }

        if (item["Championship_change_Location"].includes('Cardiff, Wales')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Cardiff, Wales','Caerdydd, United Kingdom')
        }

        if (item["Championship_change_Location"].includes(', Canada')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace(', Canada','')
        }

        if (item["Championship_change_Location"].includes('Berwick, Victoria')) {
            item["Championship_change_Location"] = 'Melbourne, Australia'
        }

        if (item["Championship_change_Location"].includes('Saint Paul')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Saint Paul','St. Paul')
        }

        if (item["Championship_change_Location"].includes('Montreal')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Montreal','Montréal')
        }
        
        if (item["Championship_change_Location"].includes('Juárez')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Juarez','Juárez')
        }
        
        if (item["Championship_change_Location"].includes('Naucalpan')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Naucalpan','Naucalpan de Juárez')
        }
        
        if (item["Championship_change_Location"].includes('Singapore')) {
            item["Championship_change_Location"] = 'Singapore, Singapore'
        }
        
        if (item["Championship_change_Location"].includes('Puerto Rico')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Puerto Rico','PR')
        }
        
        if (item["Championship_change_Location"].includes('Tokyo,Japan')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Tokyo,Japan','Tokyo, Japan')
        }
        
        if (item["Championship_change_Location"].includes('Miyagi')) {
            item["Championship_change_Location"] = 'Sendai, Japan'
        }

        if (item["Championship_change_Location"].includes('Osaka')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Osaka','Ōsaka')
        }

        if (item["Championship_change_Location"].includes('Kobe')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Kobe','Kōbe')
        }

        if (item["Championship_change_Location"].includes('Takuyama')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Takuyama','Shūnan')
        }

        if (item["Championship_change_Location"].includes('Naruko')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Naruko','Ōsaki')
        }

        if (item["Championship_change_Location"].includes('Hyōgo')) {
            item["Championship_change_Location"] = item["Championship_change_Location"].replace('Hyōgo','Harima')
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
    
    mapChanges = JSON.parse(JSON.stringify(data))
    cities = [...new Set(mapChanges.map(item => item["Championship_change_Location"]))]
    cities = cities.sort()
    cities.forEach(function(each){
        let loc = {}
        let split = each.split(', ')
        loc.city = split[0]
        loc.admin = split[1]
        if (split[0].includes('Washington')) {
            loc.city = 'Washington'
            loc.admin = 'DC'
            loc.stateName = 'District of Columbia'
        }
        if ((split[1]) && split[1].length === 2) {
            loc.stateName = abbreviations[loc.admin]
            if (!loc.stateName) {
                loc.admin = 'Canada'
            }
        }
        locData.push(loc)
    })
    populateMap(locData)
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

        if (each['Championship_change_Date'].includes('(')) {
            let regex = /\(([^()]*)\)/g
            each['Championship_change_Date'] = each['Championship_change_Date'].replace(regex,'')
        }

        let changeDate = moment(each['Championship_change_Date']).format("DD MMM YYYY")
        
        each.daysSince = countDays(changeDate)
    })
    drawActiveBoard()
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

    let calendarMonthFilter = document.querySelector('.calendar-month-filters')
    calendarMonthFilter.value = moment().format('MMM')

    let calendarDayFilter = document.querySelector('.calendar-day-filters')
    calendarDayFilter.value = moment().format('DD')

},1000)

function returnDateChanges() {
    
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
    let currentMonth = month
    
    let months = document.querySelectorAll('.calendar-day-filters option')
    months.forEach(function(each){
        each.classList.remove('inactive')
    })

    if (month == 'Feb') {
        document.querySelector('.calendar-day-filters option[value="30"').classList.add('inactive')
        document.querySelector('.calendar-day-filters option[value="31"').classList.add('inactive')
    }
    if (month == 'Apr') {
        document.querySelector('.calendar-day-filters option[value="31"').classList.add('inactive')
    }
    if (currentMonth == 'Jun') {
        document.querySelector('.calendar-day-filters option[value="31"').classList.add('inactive')
    }
    if (currentMonth == 'Sep') {
        document.querySelector('.calendar-day-filters option[value="31"').classList.add('inactive')
    }
    if (currentMonth == 'Nov') {
        document.querySelector('.calendar-day-filters option[value="31"').classList.add('inactive')
    } 
    
    
    let currentDay = document.querySelector('.calendar-day-filters').value
    if (currentDay == 31) {
        console.log(month)
        if (month == 'Feb') {
            currentDay = 29
            console.log(currentDay)
            document.querySelector('.calendar-day-filters').value = 29
            dateObj.day = 29
        }
        if (month == 'Apr') {
            currentDay = 30
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Jun') {
            currentDay = 30
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Sep') {
            currentDay = 30
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Nov') {
            currentDay = 30
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        } 
    }
    if (currentDay == 30) {
        if (currentMonth == 'Feb') {
            currentDay = 29
            document.querySelector('.calendar-day-filters').value = 29
            dateObj.day = 29
        }
    }
    
    returnDateChanges()
        
}
    
function changeDay(day) {
    dateObj.day = day

    let currentMonth = document.querySelector('.calendar-month-filters').value

    if (day == 31) {
        if (currentMonth == 'Feb') {
            document.querySelector('.calendar-day-filters').value = 29
            dateObj.day = 29
        }
        if (currentMonth == 'Apr') {
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Jun') {
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Sep') {
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        }
        if (currentMonth == 'Nov') {
            document.querySelector('.calendar-day-filters').value = 30
            dateObj.day = 30
        } 
    }
    if (day == 30) {
        if (currentMonth == 'Feb') {
            document.querySelector('.calendar-day-filters').value = 29
            dateObj.day = 29
        }
    }
    

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
        champName.classList.add('champion')
        champName.innerText = each['Champion']
        entry.appendChild(champName)
        
        activeChamps.appendChild(entry)
    })
    active.forEach(function(each){
        averageReign += each.daysSince
    })
}

function populateMap(cityData) {
    var map = L.map('map').setView({lon: 0, lat: 0}, 2);
    let geoData = []

    // add the OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        noWrap: true,
        attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).addTo(map);
    
    fetch('./geodata.json')
    .then(res => res.json())
    .then(data => {

        data.forEach(function(item, index) {
            geoData.push(item)
        })
        locData.forEach(function(each){
            // placeholders for lat and long
            let plot = {}
            plot.lat = 0
            plot.lon = 0
            
            var yellowIcon = new L.Icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
              });
            
            if (!each.stateName) {
                if (each.city === 'Red Sea') {
                    L.marker({lat: 20.7298342152784, lon: 38.36142249261074},{icon: yellowIcon},).bindPopup('39,000 Feet above the Red Sea').addTo(map);
                }
                const firstResults = geoData.filter(obj => {
                    return obj.country === each.admin
                })
                const secondResults = firstResults.filter(obj => {
                    return obj['city'] === each.city
                })
                if (secondResults.length) {
                    L.marker({lon: secondResults[0].lng, lat: secondResults[0].lat},{icon: yellowIcon}).bindPopup(secondResults[0]['city_ascii']).addTo(map);
                } else {
                    console.log(each)
                }
            } else {
                if (each.city === 'Devon') {
                    L.marker({lat: 40.04785687017131, lon: -75.42553715137038},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Fort Bragg') {
                    L.marker({lat: 35.13871979850291, lon: -79.01132345457837},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Hamburg') {
                    L.marker({lat: 40.555015319315125, lon: -75.98186714056034},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Misenheimer') {
                    L.marker({lat: 35.48226651190591, lon: -80.2873670614581},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Mount Tabor') {
                    L.marker({lat: 40.01280001282385, lon: -77.23964189924428},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Rosemont') {
                    L.marker({lat: 42.00571106965399, lon: -87.88791601290411},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Sewell') {
                    L.marker({lat: 39.76578673412731, lon: -75.14429553629017},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Uncasville') {
                    L.marker({lat: 41.49143010618226, lon: -72.08840390331785},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }
                if (each.city === 'Wildwood') {
                    L.marker({lat: 38.992768045502714, lon: -74.8152056087337},{icon: yellowIcon},).bindPopup(each.city).addTo(map);
                }

                const firstResults = geoData.filter(obj => {
                    return obj['admin_name'] === each.stateName
                })
                const secondResults = firstResults.filter(obj => {
                    return obj['city'] === each.city
                })
                if (secondResults.length) {
                    L.marker({lon: secondResults[0].lng, lat: secondResults[0].lat},{icon: yellowIcon}).bindPopup(secondResults[0]['city_ascii']).addTo(map);
                } else {
                    console.log(each)
                }
            }
            
        })
    })
    
}