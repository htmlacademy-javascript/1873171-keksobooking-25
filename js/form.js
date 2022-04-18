import {pristine, adForm, resetForm, resetSlider} from './form-validation.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {resetMap, createMarkers} from './map.js';
import {resetFilters} from './filters.js';
import {previewImageReset} from './images.js';


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
  resetForm();
  resetSlider();
  resetMap();
  resetFilters();
  previewImageReset();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnOriginalState();
  createMarkers();
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
