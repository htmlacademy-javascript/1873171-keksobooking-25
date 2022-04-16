import {pristine, adForm, sliderElement} from './form-validation.js';
import {isEscapeKey} from './util.js';
import {getStartСoordinates, getStartMainPinMarker} from './map.js';
import {sendData} from './api.js';

// if (window.localStorage) {
//   const elements = document.querySelectorAll('[name]');

//   for (let i = 0, length = elements.length; i < length; i++) {
//     ((element) => {
//       const name = element.getAttribute('name');

//       element.value = localStorage.getItem(name) || '';

//       element.onkeyup = function() {
//         localStorage.setItem(name, element.value);
//       };
//     })(elements[i]);
//   }
// }

// Сообщение после отправки формы

const showMessage = (message) => {
  const containerMessage = document.querySelector(`#${message}`).content.querySelector(`.${message}`);
  document.body.append(containerMessage);

  document.addEventListener('click', () => {
    containerMessage.classList.add('visually-hidden');
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      containerMessage.classList.add('visually-hidden');
    }
  });
};

// Возврат страницы в исходное состояние

const resetButton = document.querySelector('.ad-form__reset');

const returnOriginalState = () => {
  adForm.reset();
  sliderElement.noUiSlider.updateOptions({
    start: 0,
  });
  getStartСoordinates();
  getStartMainPinMarker();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnOriginalState();
});

// Блокировка/разблокировка кнопки 'отправить'

const submitButton = document.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};


const setUserFormSubmit = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          showMessage('success');
          returnOriginalState();
        },
        () => {
          unblockSubmitButton();
          showMessage('error');
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
