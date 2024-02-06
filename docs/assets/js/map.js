let latitude = document.currentScript.getAttribute('data-latitude');
let longitude = document.currentScript.getAttribute('data-longitude');

let map = L.map('map').setView([parseFloat(latitude), parseFloat(longitude)], 14);

L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z} ', {
    maxZoom: 19,
    attribution: '© Google Maps'
}).addTo(map);

let marker = L.marker([parseFloat(latitude), parseFloat(longitude)]).addTo(map);

let mapHTMLElement = document.getElementById('map');

mapHTMLElement.querySelector('.leaflet-marker-icon').style.width = "42px";
mapHTMLElement.querySelector('.leaflet-marker-icon').style.height = "42px";
mapHTMLElement.querySelector('.leaflet-marker-icon').style.marginLeft = "-21px";

mapHTMLElement.querySelector('.leaflet-marker-shadow').style.width = "42px";
mapHTMLElement.querySelector('.leaflet-marker-shadow').style.height = "42px";