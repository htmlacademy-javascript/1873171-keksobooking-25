import {switchToActiveState} from './page-state.js';
import {createSimilarList} from './similar-ad.js';

const address = document.querySelector('#address');
const latitude = 35.681729;
const longtude = 139.753927;

const getStartСoordinates = () => {
  address.value = `${latitude}, ${longtude}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    switchToActiveState();
    getStartСoordinates();
  })
  .setView({
    lat: latitude,
    lng: longtude,
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
    lat: latitude,
    lng: longtude,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

const getStartMainPinMarker = () => {
  mainPinMarker.setLatLng({
    lat: latitude,
    lng: longtude,
  });
};

mainPinMarker.on('moveend', (evt) => {
  address.value = `${evt.target.getLatLng()['lat'].toFixed(5)}, ${evt.target.getLatLng()['lng'].toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (ad) => {
  const {lat, lng} = ad.location;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker.addTo(markerGroup).bindPopup(createSimilarList(ad));
};

const resetMap = () => {
  map.setView({
    lat: latitude,
    lng: longtude,
  }, 12);
  getStartСoordinates();
  getStartMainPinMarker();
  map.closePopup();
};

export {createMarker, markerGroup, resetMap};
