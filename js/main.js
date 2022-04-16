import './page-state.js';
import {setUserFormSubmit} from './form.js';
import './similar-ad.js';
import {createMarkers} from './map.js';
import {getData} from './api.js';

const CREATE_MARKERS_COUNT = 10;

getData((ads) => {
  createMarkers(ads.slice(0, CREATE_MARKERS_COUNT));
});

setUserFormSubmit();
