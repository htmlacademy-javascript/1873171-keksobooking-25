const TITLE_LENGTH_MIN = 30;
const TITLE_LENGTH_MAX = 100;
const PRICE_MAX = 100000;

const adFormContainer = document.querySelector('.ad-form');
const sliderContainer = document.querySelector('.ad-form__slider');
const titleContainer = adFormContainer.querySelector('#title');
const numberRoomsContainer = adFormContainer.querySelector('#room_number');
const numberGuestsContainer = adFormContainer.querySelector('#capacity');
const typeOfHousingContainer = adFormContainer.querySelector('#type');
const priceContainer = adFormContainer.querySelector('#price');
const timeInContainer = adFormContainer.querySelector('#timein');
const timeOutContainer = adFormContainer.querySelector('#timeout');

const pristine = new Pristine(adFormContainer, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__element--error'
});

// Валидация поля "Заголовок объявления"

const checkTitle = (value) => value.length >= TITLE_LENGTH_MIN && value.length <= TITLE_LENGTH_MAX;

const getTitleErrorMessage = (value) => {
  if (value.length <= TITLE_LENGTH_MIN) {
    return `Минимальное количество символов 30. Длина поля сейчас ${value.length}.`;
  }
};

pristine.addValidator(titleContainer, checkTitle, getTitleErrorMessage);

// Валидация поля «Количество комнат» и поля «Количество мест»

const maxCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};

const checkCapacity = () => maxCapacity[numberRoomsContainer.value].includes(numberGuestsContainer.value);

numberRoomsContainer.addEventListener('input', () => {
  checkCapacity();
  pristine.validate(numberGuestsContainer);
});

const getGuestsErrorMessage = () =>`Выбор ${numberRoomsContainer.value} ${numberRoomsContainer.value === '1' ? 'комнаты' : 'комнат'} для ${numberGuestsContainer.value.toLowerCase()} ${numberGuestsContainer.value === '1' ? 'гостя' : 'гостей'} невозможен.`;

pristine.addValidator(numberGuestsContainer, checkCapacity, getGuestsErrorMessage);

// Валидация поля «Цена за ночь»

const minPrice = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const validatePrice = () => priceContainer.value >= parseInt(minPrice[typeOfHousingContainer.value], 10);

const getPriceErrorMessage = () => `Для выбранного типа жилья минимальная цена за ночь ${minPrice[typeOfHousingContainer.value]} руб.`;

pristine.addValidator(priceContainer, validatePrice, getPriceErrorMessage);

// // Реализация слайдера

noUiSlider.create(sliderContainer, {
  range: {
    min: 0,
    max: PRICE_MAX,
  },
  start: 0,
  step: 100,
  connect: 'lower',
  format: {
    to: (value) => value.toFixed(0),
    from: (value) =>  Math.trunc(value),
  },
});

sliderContainer.noUiSlider.on('update', () => {
  priceContainer.value = sliderContainer.noUiSlider.get();
});

sliderContainer.noUiSlider.on('change', () => {
  pristine.validate(priceContainer);
});

const resetSlider = () => {
  sliderContainer.noUiSlider.updateOptions({
    start: 0,
  });
};

// Валидация поля «Тип жилья»

const onTypeChange = () => {
  priceContainer.placeholder = minPrice[typeOfHousingContainer.value];
  pristine.validate(priceContainer);
};

typeOfHousingContainer.addEventListener('change', () => {
  onTypeChange();
});

// Валидация поля «Время заезда» и поля «Время выезда»

const onTimeChange = (element, elementChecked) => {
  element.selectedIndex = elementChecked.selectedIndex;
  pristine.validate(elementChecked);
};

timeInContainer.addEventListener('change', () => {
  onTimeChange(timeOutContainer, timeInContainer);
});

timeOutContainer.addEventListener('change', () => {
  onTimeChange(timeInContainer, timeOutContainer);
});

const resetForm = () => {
  adFormContainer.reset();
  onTypeChange();
  pristine.reset();
};

export {pristine, adFormContainer, resetForm, resetSlider};
