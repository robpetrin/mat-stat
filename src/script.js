// Recalculate Height
let panel = document.querySelector('#panel')
panel.minHeight = `${window.innerHeight}px`
window.onorientationchange = function(event) {
  panel.style.minHeight = `${window.innerHeight}px`
}

//Slideout Menu
var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 192,
	'tolerance': 70
})
// slideout.open()
let check = document.querySelector('#check')
function checkOpen() {
  if (slideout.isOpen()) {
    check.checked = true
  } else {
    check.checked = false
  }  
}
function closeIcon() {
  slideout.close()
  checkOpen()
}
slideout.on('open', function() {
  checkOpen()
})
slideout.on('close', function() {
  checkOpen()
})

// Keystroke Slideout Toggle
document.addEventListener('keydown', function (event) { 
  if (event.keyCode == '32') {
    event.preventDefault()
    slideout.toggle()
    checkOpen()
  }
});

function loadMap() {
  document.querySelectorAll('.ol-viewport').forEach(function(each){
    each.remove()
  })
  // Map Element
  var map = new ol.Map({
          target: 'map-element',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([37.41, 8.82]),
            zoom: 4
          })
        });
}

// Filters Toggle
let filterTitle = document.querySelector('.filters-title')
filterTitle.addEventListener('click',function(elem){
  let icons = filterTitle.querySelectorAll('.icon')
  icons.forEach(function(elem){
    elem.classList.toggle('active')
  })
  let filtersDrawer = document.querySelector('.filters-drawer')
  filtersDrawer.classList.toggle('open')
  filtersDrawer.classList.toggle('closed')
})

// Filters Reset
let filtersReset = document.querySelector('#reset-button')
filtersReset.addEventListener('click',function(elem){
  document.querySelector('#filter-date').value = ''
  document.querySelectorAll('.promotion-tag').forEach(function(elem){
    elem.classList.remove('inactive')
  })
  document.querySelector('#city-search').value = ''
})

// Toggle Tags
let filterTags = document.querySelectorAll('.promotion-tag')
filterTags.forEach(function(elem){
  elem.addEventListener('click',function(e) {
    elem.classList.toggle('inactive')
  })
})

// Menu Interactivity
let menuItems = document.querySelectorAll('.menu-item a')
let contentSection = document.querySelectorAll('.main-content > div')
menuItems.forEach(function(elem){
  elem.addEventListener('click',function(event){
    let hash = event.target.closest('li').id
    hash = hash.slice(0, -7)
    menuItems.forEach(function(item){
      item.classList.remove('active')
    })
    contentSection.forEach(function(item) {
      slideout.toggle()
      item.style.display = 'none'
      document.querySelector(`#${hash}`).style.display = 'block'
      loadMap()
    })
    elem.classList.add('active')
  })
})

if (!window.location.hash) {
  document.querySelector('#current').style.display = 'block'
  document.querySelector

}

if (window.location.hash) {
  document.querySelector(window.location.hash).style.display = 'block'
}