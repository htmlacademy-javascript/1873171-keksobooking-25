const ALERT_SHOW_TIME = 5000;

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

// Возвращает массив случайной длины, значения не повторяются.

const getRandomArray = (element) => {
  let value;
  const lengthArray = getRandomNumber(0, element.length - 1);
  const arrayEmptyCheck = Array.from({length: 0});
  const RECEIVED_ELEMENTS = Array.from({length: 0});

  if (lengthArray !== 0) {
    for (let i = 0; i <= lengthArray; i++) {
      value = getValue(element, arrayEmptyCheck);
      RECEIVED_ELEMENTS.push(value);
    }
  }
  return RECEIVED_ELEMENTS;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

// Показывает сообщение с ошибкой на 5 секунд

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '25px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = '#353535';
  alertContainer.style.backgroundColor = '#ffaa99';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomNumber, getRandomFractionalNumber, getRandomArrayElement, getValue, getRandomArray, isEscapeKey, showAlert, debounce};
