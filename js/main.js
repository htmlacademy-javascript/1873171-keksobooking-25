// Возвращает случайное целое число из переданного диапазона включительно

const getRandomNumber = (minNumber, maxNumber) => {
  minNumber = Math.ceil(minNumber);
  maxNumber = Math.floor(maxNumber);

  if ( minNumber >= 0 && maxNumber > minNumber) {
    return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
  }

  return 'Invalid';
};

getRandomNumber( 20, 70);


// Возвращает случайное число с плавающей точкой из переданного диапазона включительно.

const getRandomFractionalNumber = (minNumber, maxNumber, digits) => {

  if ( minNumber >= 0 && maxNumber > minNumber) {
    return (Math.random() * (maxNumber - minNumber + 1) + minNumber).toFixed(digits);
  }

  return 'Invalid';
};

getRandomFractionalNumber( 2.3, 10.4, 1);
