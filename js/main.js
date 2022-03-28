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

const GUESTS_QUANTITY = [1, 2, 3];

const ARRAY_NUMBERS = Array.from({length: 10}, (v, i) => ++i);
const ARRAY_EMPTY = Array.from({length: 0});
const ARRAY_EMPTY_STRING = Array.from({length: 0});

const LATITUDE_MIN = 35.65000;
const LATITUDE_MAX = 35.70000;
const LONGTUBE_MIN = 139.70000;
const LONGTUBE_MAX = 139.80000;

const PRICE_MAX = 100000;

const CREATE_ADS_COUNT = 10;

// Возвращает случайное целое число из переданного диапазона включительно

const getRandomNumber = (minNumber, maxNumber) => {
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);

  if ( minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  throw new Error('Некорректный ввод данных.');
};

// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFractionalNumber = (minNumber, maxNumber, digits) => {

  if ( minNumber >= 0 && maxNumber > minNumber && digits >= 1) {
    return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(digits);
  }

  throw new Error('Некорректный ввод данных.');
};

// Возвращает случайное число из переданных значений.

const getRandomArrayElement = (elements) => (elements[getRandomNumber(0, elements.length - 1)]);

// Возвращает случайное число из переданных значений, число не повторяется(в рамках переданных значений).

const getValue = (elements, elementsCheck) => {
  let value;
  do {
    if (elements.length === elementsCheck.length) {
      elementsCheck.splice(0, elements.length);
    } value = getRandomArrayElement(elements);
  } while (elementsCheck.indexOf(value, 0) >= 0);
  elementsCheck.push(value);
  return value;
};

const getNumber = () => {
  const value = getValue(ARRAY_NUMBERS, ARRAY_EMPTY);
  return (value < 10) ? `0${value}` : `${value}`;
};

const getString = () => {
  const value = getValue(FEATURES, ARRAY_EMPTY_STRING);
  return `${value}`;
};

// Создает объявление

const createAd = function () {
  const latitude = getRandomFractionalNumber(LATITUDE_MIN, LATITUDE_MAX, 5);
  const longtude = getRandomFractionalNumber(LONGTUBE_MIN, LONGTUBE_MAX, 5);

  return {
    author: {avatar: `img/avatars/user${  getNumber()  }.png`},
    offer: {
      title: 'Милая, уютная квартирка в центре Токио',
      address: `${latitude} , ${longtude}`,
      price: getRandomNumber(0, PRICE_MAX),
      type: getRandomArrayElement(TYPE_OF_HOUSING),
      rooms: getRandomArrayElement(ROOMS_QUANTITY),
      guests: getRandomArrayElement(GUESTS_QUANTITY),
      checkin: getRandomArrayElement(CHECKIN_TIME),
      checkout: getRandomArrayElement(CHECKOUT_TIME),
      features: getString(),
      description: 'В распоряжении гостей апартаменты со стиральной машиной, телевизором с плоским экраном, гостиным уголком, полностью оборудованной кухней с микроволновой печью, холодильником, плитой и чайником.',
      photos: getRandomArrayElement(PHOTOS),
    },
    location: {
      lat: latitude,
      lng: longtude,
    }
  };
};

// Массив с обьявлениями

const createAds = Array.from({length: CREATE_ADS_COUNT}, createAd);

createAds();
