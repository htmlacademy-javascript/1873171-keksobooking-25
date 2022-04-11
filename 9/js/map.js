import {createSimilarList, similarAds} from './similar-ad.js';
import {} from './page-state.js';

const address = document.querySelector('#address');


const map = L.map('map-canvas')
  .on('load', () => {
    // switchToActiveState();
  })
  .setView({
    lat: 35.681729,
    lng: 139.753927,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: 35.68172,
    lng: 139.75392,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

address.value = `${mainPinMarker.getLatLng()}`;

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng()}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// Слой с маркерами

// const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {location: {lat}, location: {lng}} = ad;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
      toGeoJSON: 5,
    },
  );

  marker.addTo(map).bindPopup(createSimilarList(ad));

  return marker;
};

similarAds.forEach((ad) => {
  createMarker(ad);
});

// Очистить слой

// markerGroup.clearLayers();

