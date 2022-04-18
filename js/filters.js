import {createMarker, markerGroup} from './map.js';

const SIMILAR_AD_COUNT = 10;

const filtersMap = document.querySelector('.map__filters');
const typeHousingInput = document.querySelector('[name="housing-type"]');
const priceHousingInput = document.querySelector('[name="housing-price"]');
const roomsHousingInput = document.querySelector('[name="housing-rooms"]');
const guestHousingInput = document.querySelector('[name="housing-guests"]');
const featuresHousing = document.querySelector('#housing-features');


const filterType = (type) => type === typeHousingInput.value || typeHousingInput.value === 'any';

const filterPrice = (price) => {
  if (priceHousingInput.value === 'low') {
    return price < 10000;
  }
  if (priceHousingInput.value === 'middle') {
    return price >= 10000 && price < 50000;
  }
  if (priceHousingInput.value === 'high') {
    return price >= 50000;
  }
  return true;
};

const filterRooms = (rooms) => `${rooms}` === roomsHousingInput.value || roomsHousingInput.value === 'any';

const filterGuests = (guests) => `${guests}` === guestHousingInput.value || guestHousingInput.value === 'any';

const selectedFeatures = new Set();

const filterFeatures = (features) => {
  if (selectedFeatures.size > 0 && !features) {
    return false;
  }
  if (selectedFeatures.size === 0) {
    return true;
  }
  const selectedFeaturesArr = Array.from(selectedFeatures);
  if (!(selectedFeaturesArr.every((feature) => features.includes(feature)))) {
    return false;
  }
  return true;
};


const setFiltersChange = (callback) => {
  typeHousingInput.addEventListener('change', () => {
    callback();
  });
  priceHousingInput.addEventListener('change', () => {
    callback();
  });
  roomsHousingInput.addEventListener('change', () => {
    callback();
  });
  guestHousingInput.addEventListener('change', () => {
    callback();
  });
  featuresHousing.addEventListener('change', (evt) => {
    const featuresChecked = evt.target;
    if (featuresChecked.checked === true) {
      selectedFeatures.add(featuresChecked.value);
    } else {
      selectedFeatures.delete(featuresChecked.value);
    }
    callback();
  });
};

const filterAds = (similarAds) => {
  similarAds
    .filter((ad) => filterType(ad.offer.type)
    && filterPrice(ad.offer.price)
    && filterRooms(ad.offer.rooms)
    && filterGuests(ad.offer.guests)
    && filterFeatures(ad.offer.features)
    )
    .slice(0, SIMILAR_AD_COUNT);
};

const createMarkers = () => {
  markerGroup.clearLayers();
  filterAds.forEach((filterAd) => {
    createMarker(filterAd);
  });
};


const resetFilters = () => {
  filtersMap.reset();
};

export {setFiltersChange, createMarkers, resetFilters};
