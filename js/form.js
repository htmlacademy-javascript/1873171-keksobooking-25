import {pristine, adFormContainer, resetForm, resetSlider} from './form-validation.js';
import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {resetMap} from './map.js';
import {resetFilters} from './filters.js';
import {resetPreviewImage} from './images.js';
import {getFilteredData} from './main.js';

const resetButtonContainer = document.querySelector('.ad-form__reset');
const submitButtonContainer = document.querySelector('.ad-form__submit');
const succcessMessageContainer = document.querySelector('#success').content.querySelector('.success');
const errorMessageContainer = document.querySelector('#error').content.querySelector('.error');

// Сообщения после отправки формы


const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeShowMessage();
  }
};

const onMessageClick = () => {
  closeShowMessage();
};

const showMessage = () => {
  document.body.append(succcessMessageContainer);

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);

};

function closeShowMessage () {
  succcessMessageContainer.remove();

  document.removeEventListener('keydown', onMessageEscKeydown);
  document.removeEventListener('click', onMessageClick);
}

const onErrorMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorShowMessage();
  }
};

const onErrorMessageClick = () => {
  closeErrorShowMessage();
};

const showErrorMessage = () => {
  document.body.append(errorMessageContainer);

  document.addEventListener('keydown', onErrorMessageEscKeydown);
  document.addEventListener('click', onErrorMessageClick);

};

function closeErrorShowMessage () {
  errorMessageContainer.remove();

  document.removeEventListener('keydown', onErrorMessageEscKeydown);
  document.removeEventListener('click', onErrorMessageClick);
}


// Блокировка/разблокировка кнопки 'отправить'

const blockSubmitButton = () => {
  submitButtonContainer.disabled = true;
};

const unblockSubmitButton = () => {
  submitButtonContainer.disabled = false;
};

// Возврат страницы в исходное состояние

const returnOriginalState = () => {
  resetForm();
  resetSlider();
  resetMap();
  getFilteredData();
  resetFilters();
  resetPreviewImage();
};

resetButtonContainer.addEventListener('click', (evt) => {
  evt.preventDefault();
  returnOriginalState();
});

const setUserFormSubmit = () => {
  adFormContainer.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          unblockSubmitButton();
          showMessage();
          returnOriginalState();
        },
        () => {
          unblockSubmitButton();
          showErrorMessage();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setUserFormSubmit};
