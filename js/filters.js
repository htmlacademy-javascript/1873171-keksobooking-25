import {createMarker, markerGroup} from './map.js';

const SIMILAR_AD_COUNT = 10;
const PRICE_LOW = 10000;
const PRICE_HIGH = 50000;

const filtersMapContainer = document.querySelector('.map__filters');
const typeHousingInputContainer = document.querySelector('[name="housing-type"]');
const priceHousingInputContainer = document.querySelector('[name="housing-price"]');
const roomsHousingInputContainer = document.querySelector('[name="housing-rooms"]');
const guestHousingInputContainer = document.querySelector('[name="housing-guests"]');
const featuresHousingContainer = document.querySelector('#housing-features');

const filterType = (type) => type === typeHousingInputContainer.value || typeHousingInputContainer.value === 'any';

const filterPrice = (price) => {
  if (priceHousingInputContainer.value === 'low') {
    return price < PRICE_LOW;
  }
  if (priceHousingInputContainer.value === 'middle') {
    return price >= PRICE_LOW && price < PRICE_HIGH;
  }
  if (priceHousingInputContainer.value === 'high') {
    return price >= PRICE_HIGH;
  }
  return true;
};

const filterRooms = (rooms) => `${rooms}` === roomsHousingInputContainer.value || roomsHousingInputContainer.value === 'any';

const filterGuests = (guests) => `${guests}` === guestHousingInputContainer.value || guestHousingInputContainer.value === 'any';

const selectedFeatures = new Set();

const filterFeatures = (features) => {
  if (selectedFeatures.size > 0 && !features) {
    return false;
  }
  if (selectedFeatures.size === 0) {
    return true;
  }
  const selectedFeaturesArr = Array.from(selectedFeatures);
  return selectedFeaturesArr.every((feature) => features.includes(feature));
};

const setFiltersChange = (callback) => {
  typeHousingInputContainer.addEventListener('change', () => {
    callback();
  });
  priceHousingInputContainer.addEventListener('change', () => {
    callback();
  });
  roomsHousingInputContainer.addEventListener('change', () => {
    callback();
  });
  guestHousingInputContainer.addEventListener('change', () => {
    callback();
  });
  featuresHousingContainer.addEventListener('change', (evt) => {
    const featuresChecked = evt.target;
    if (featuresChecked.checked) {
      selectedFeatures.add(featuresChecked.value);
    } else {
      selectedFeatures.delete(featuresChecked.value);
    }
    callback();
  });
};

const filterAds = (similarAds) =>
  similarAds
    .filter((ad) => filterType(ad.offer.type)
    && filterPrice(ad.offer.price)
    && filterRooms(ad.offer.rooms)
    && filterGuests(ad.offer.guests)
    && filterFeatures(ad.offer.features)
    )
    .slice(0, SIMILAR_AD_COUNT);

const createMarkers = (ads) => {
  markerGroup.clearLayers();
  filterAds(ads).forEach((ad) => {
    createMarker(ad);
  });
};

const resetFilters = () => {
  filtersMapContainer.reset();
};

export {setFiltersChange, createMarkers, resetFilters};
