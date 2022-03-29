// Recalculate Height
let panel = document.querySelector('#panel')
panel.minHeight = `${window.innerHeight}px`
window.onorientationchange = function(event) {
  panel.style.minHeight = `${window.innerHeight}px`
}

var slideout = new Slideout({
	'panel': document.getElementById('panel'),
	'menu': document.getElementById('menu'),
	'padding': 192,
	'tolerance': 70
})

slideout.open()

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
    slideout.toggle()
    checkOpen()
  }
});

// Map Element
var map = new ol.Map({
        target: 'map',
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

      fetch('https://en.wikipedia.org/wiki/List_of_WWE_Intercontinental_Champions')
      .then(function(response) {
          // When the page is loaded convert it to text
          return response.text()
      })
      .then(function(html) {
          // Initialize the DOM parser
          var parser = new DOMParser();
  
          // Parse the text
          var doc = parser.parseFromString(html, "text/html");
  
          // You can now even select part of that html as you would in the regular DOM 
          // Example:
          // var docArticle = doc.querySelector('article').innerHTML;
  
          console.log(doc);
      })
      .catch(function(err) {  
          console.log('Failed to fetch page: ', err);  
      });