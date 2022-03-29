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

export {getRandomNumber, getRandomFractionalNumber, getRandomArrayElement, getValue};
