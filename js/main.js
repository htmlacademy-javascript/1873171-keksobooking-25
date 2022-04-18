import './page-state.js';
import {debounce} from './util.js';
import {setUserFormSubmit} from './form.js';
import './map.js';
import './similar-ad.js';
import {createMarkers, setFiltersChange} from './filters.js';
import {getData} from './api.js';


const RERENDER_DELAY = 500;

getData((ads) => {
  createMarkers(ads);
  setFiltersChange(debounce(
    () => createMarkers(ads), RERENDER_DELAY));
});

setUserFormSubmit();
