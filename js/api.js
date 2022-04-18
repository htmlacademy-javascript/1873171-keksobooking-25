import {showAlert} from './util.js';

const url = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(`${url}/data`)
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch(() => {
      showAlert('Не удалось загрузить объявления. Попобуйте обновить страницу.');
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    url,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};
