import {createMarker, markerGroup} from './map.js';

const SIMILAR_AD_COUNT = 10;

const typeHousingInput = document.querySelector('[name="housing-type"]');
const housingPriceInput = document.querySelector('[name="housing-price"]');
const housingRoomsInput = document.querySelector('[name="housing-rooms"]');
const housingGuestInput = document.querySelector('[name="housing-guests"]');
const housingFeatures = document.querySelector('#housing-features');


const filterType = (type) => type === typeHousingInput.value || typeHousingInput.value === 'any';

const filterPrice = (price) => {
  if (housingPriceInput.value === 'low') {
    return price < 10000;
  }
  if (housingPriceInput.value === 'middle') {
    return price >= 10000 && price < 50000;
  }
  if (housingPriceInput.value === 'high') {
    return price >= 50000;
  }
  return true;
};

const filterRooms = (rooms) => `${rooms}` === housingRoomsInput.value || housingRoomsInput.value === 'any';

const filterGuests = (guests) => `${guests}` === housingGuestInput.value || housingGuestInput.value === 'any';

const selectedFeatures = new Set();

const filterFeatures = (features) => {
  if (selectedFeatures.size === 0 || !features) {
    return true;
  } else {
    const selectedFeaturesArr = Array.from(selectedFeatures);
    if (!(selectedFeaturesArr.every((feature) => features.includes(feature)))) {
      return false;
    }
    return true;
  }
};

const setEvent = (cd) => {
  typeHousingInput.addEventListener('change', () => {
    cd();
  });
  housingPriceInput.addEventListener('change', () => {
    cd();
  });
  housingRoomsInput.addEventListener('change', () => {
    cd();
  });
  housingGuestInput.addEventListener('change', () => {
    cd();
  });
  housingFeatures.addEventListener('change', (evt) => {
    const featuresChecked = evt.target;
    if (featuresChecked.checked === true) {
      selectedFeatures.add(featuresChecked.value);
    } else {
      selectedFeatures.delete(featuresChecked.value);
    }
    cd();
  });
};

const createMarkers = (similarAds) => {
  markerGroup.clearLayers();
  similarAds
    .filter((ad) => filterType(ad.offer.type)
    && filterPrice(ad.offer.price)
    && filterRooms(ad.offer.rooms)
    && filterGuests(ad.offer.guests)
    && filterFeatures(ad.offer.features)
    )
    .slice(0, SIMILAR_AD_COUNT)
    .forEach((ad) => {
      createMarker(ad);
    });
};

export {createMarkers, setEvent};
