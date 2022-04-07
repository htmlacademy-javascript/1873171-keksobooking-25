import './form-state.js';

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

const getTitlekErrorMessage = (value) => {
  if (value.length <= 30) {
    return `Минимальное количество символов 30. Длина поля сейчас ${value.length}.`;
  }
};

pristine.addValidator(title, checkTitle, getTitlekErrorMessage);

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

const getCapacitykErrorMessage = () =>`Выбор ${numberRooms.value} ${numberRooms.value === '1' ? 'комнаты' : 'комнат'} для ${numberGuests.value.toLowerCase()} ${numberGuests.value === '1' ? 'гостя' : 'гостей'} невозможен.`;
const getGuestsErrorMessage = () =>`Для ${numberGuests.value.toLowerCase()} ${numberGuests.value === '1' ? 'гостя' : 'гостей'} выбор ${numberRooms.value} ${numberRooms.value === '1' ? 'комнаты' : 'комнат'}  невозможен.`;

pristine.addValidator(numberRooms, checkCapacity, getCapacitykErrorMessage);
pristine.addValidator(numberGuests, checkCapacity,  getGuestsErrorMessage);

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

function getPriceErrorMessage () {
  return `Для выбранного типа жилья минимальная цена за ночь ${minPrice[typeOfHousing.value]} руб.`;
}

pristine.addValidator(price, validatePrice, getPriceErrorMessage);

// // Валидация поля «Тип жилья»

// const onTypeChange = () => {
//   price.placeholder = minPrice[typeOfHousing.value];
//   pristine.validate(price);
// };

// typeOfHousing.addEventListener('change', () => {
//   onTypeChange();
// });

// // Валидация поля «Время заезда» и поля «Время выезда»

// const timeIn = adForm.querySelector('#timein');
// const timeOut = adForm.querySelector('#timeout');

// const onTimeChange = (element, elementChecked) => {
//   element.selectedIndex = elementChecked.selectedIndex;
//   pristine.validate(elementChecked);
// };

// timeIn.addEventListener('change', () => {
//   onTimeChange(timeOut, timeIn);
// });

// timeOut.addEventListener('change', () => {
//   onTimeChange(timeIn, timeOut);
// });

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
