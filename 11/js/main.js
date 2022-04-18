import './page-state.js';
import {setUserFormSubmit} from './form.js';
import './similar-ad.js';
import {debounce} from './util.js';
import {getData} from './api.js';
import {createMarkers, setEvent} from './filters.js';

const RERENDER_DELAY = 500;

getData((ads) => {
  createMarkers(ads);
  setEvent(debounce(
    () => createMarkers(ads), RERENDER_DELAY));
});

setUserFormSubmit();
