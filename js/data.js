import {getRandomNumber, getRandomArrayElement, getRandomFractionalNumber, getValue, getRandomArray} from './util.js';

const TYPE_OF_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const ROOMS_QUANTITY = [1, 2, 3, 100];

const GUESTS_QUANTITY = [1, 2, 3, 'не для гостей'];

const ARRAY_NUMBERS = Array.from({length: 10}, (v, i) => ++i);
const ARRAY_EMPTY = Array.from({length: 0});

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGTUBE_MIN = 139.70000;
const LONGTUBE_MAX = 139.80000;

const PRICE_MAX = 100000;

const getNumber = () => {
  const value = getValue(ARRAY_NUMBERS, ARRAY_EMPTY);
  return (value < 10) ? `0${value}` : `${value}`;
};

// Создает объявление

const createAd = function () {
  const latitude = getRandomFractionalNumber(LATITUDE_MIN, LATITUDE_MAX, 5);
  const longtude = getRandomFractionalNumber(LONGTUBE_MIN, LONGTUBE_MAX, 5);

  return {
    author: {avatar: `img/avatars/user${  getNumber()  }.png`},
    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: `${latitude}, ${longtude}`,
      price: getRandomNumber(0, PRICE_MAX),
      type: getRandomArrayElement(TYPE_OF_HOUSING),
      rooms: getRandomArrayElement(ROOMS_QUANTITY),
      guests: getRandomArrayElement(GUESTS_QUANTITY),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getRandomArray(FEATURES),
      description: 'В распоряжении гостей апартаменты со стиральной машиной, телевизором, полностью оборудованной кухней.',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longtude,
    }
  };
};

// Создает массив с обьявлениями

const createAds = (count) => Array.from({length: count}, createAd);

export {createAds};
