import './map.js';
import {debounce} from './util.js';
import {createMarkers, setFiltersChange} from './filters.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form.js';


const RERENDER_DELAY = 500;

const getFilteredData = () =>
  getData((ads) => {
    createMarkers(ads);
    setFiltersChange(debounce(
      () => createMarkers(ads), RERENDER_DELAY));
  });


getFilteredData();
setUserFormSubmit();

export {getFilteredData};
