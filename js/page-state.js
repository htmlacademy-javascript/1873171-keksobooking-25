const switchToInactiveState = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  document.querySelector('.ad-form-header').setAttribute('disabled', 'disabled');

  document.querySelectorAll('.ad-form__element').forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });

  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  document.querySelector('.map__features').setAttribute('disabled', 'disabled');

  document.querySelectorAll('.map__filter').forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
};

const switchToActiveState = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form-header').removeAttribute('disabled');

  document.querySelectorAll('.ad-form__element').forEach((value) => {
    value.removeAttribute('disabled');
  });

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  document.querySelector('.map__features').removeAttribute('disabled');

  document.querySelectorAll('.map__filter').forEach((value) => {
    value.removeAttribute('disabled');
  });
};

export {switchToActiveState, switchToInactiveState};
