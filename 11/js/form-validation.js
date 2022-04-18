import {switchToInactiveState} from './page-state.js';

switchToInactiveState();

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error'
});

// Валидация поля "Заголовок объявления"

const title = adForm.querySelector('#title');

const checkTitle = (value) => value.length >= 30 && value.length <= 100;

const getTitleErrorMessage = (value) => {
  if (value.length <= 30) {
    return `Минимальное количество символов 30. Длина поля сейчас ${value.length}.`;
  }
};

pristine.addValidator(title, checkTitle, getTitleErrorMessage);

// Валидация поля «Количество комнат» и поля «Количество мест»

const numberRooms = adForm.querySelector('#room_number');
const numberGuests = adForm.querySelector('#capacity');

const maxCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const checkCapacity = () => maxCapacity[numberRooms.value].includes(numberGuests.value);

numberRooms.addEventListener('input', () => {
  checkCapacity();
  pristine.validate(numberGuests);
});

const getGuestsErrorMessage = () =>`Выбор ${numberRooms.value} ${numberRooms.value === '1' ? 'комнаты' : 'комнат'} для ${numberGuests.value.toLowerCase()} ${numberGuests.value === '1' ? 'гостя' : 'гостей'} невозможен.`;

pristine.addValidator(numberGuests, checkCapacity, getGuestsErrorMessage);

// Валидация поля «Цена за ночь»

const typeOfHousing = adForm.querySelector('#type');
const price = adForm.querySelector('#price');

const minPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const validatePrice = () => price.value >= parseInt(minPrice[typeOfHousing.value], 10);

const getPriceErrorMessage = () => `Для выбранного типа жилья минимальная цена за ночь ${minPrice[typeOfHousing.value]} руб.`;

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

// // Реализация слайдера

const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) =>  Math.trunc(value),
  },
});

sliderElement.noUiSlider.on('update', () => {
  price.value = sliderElement.noUiSlider.get();
});

sliderElement.noUiSlider.on('change', () => {
  pristine.validate(price);
});

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    start: 0,
  });
};

// Валидация поля «Тип жилья»

const onTypeChange = () => {
  price.placeholder = minPrice[typeOfHousing.value];
  pristine.validate(price);
};

typeOfHousing.addEventListener('change', () => {
  onTypeChange();
});

// Валидация поля «Время заезда» и поля «Время выезда»

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

const onTimeChange = (element, elementChecked) => {
  element.selectedIndex = elementChecked.selectedIndex;
  pristine.validate(elementChecked);
};

timeIn.addEventListener('change', () => {
  onTimeChange(timeOut, timeIn);
});

timeOut.addEventListener('change', () => {
  onTimeChange(timeIn, timeOut);
});

const resetForm = () => {
  adForm.reset();
  onTypeChange();
  pristine.reset();
};

export {pristine, adForm, resetForm, resetSlider};
