const switchToInactiveState = () => {
  document.querySelector('.ad-form').classList.add('ad-form--disabled');
  document.querySelector('.ad-form-header').setAttribute('disabled', true);

  document.querySelectorAll('.ad-form__element').forEach((value) => {
    value.setAttribute('disabled', true);
  });

  document.querySelector('.map__filters').classList.add('map__filters--disabled');
  document.querySelector('.map__features').setAttribute('disabled', true);

  document.querySelectorAll('.map__filter').forEach((value) => {
    value.setAttribute('disabled', true);
  });
};

const switchToActiveState = () => {
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  document.querySelector('.ad-form-header').removeAttribute('disabled', true);

  document.querySelectorAll('.ad-form__element').forEach((value) => {
    value.removeAttribute('disabled', true);
  });

  document.querySelector('.map__filters').classList.remove('map__filters--disabled');
  document.querySelector('.map__features').removeAttribute('disabled', true);

  document.querySelectorAll('.map__filter').forEach((value) => {
    value.removeAttribute('disabled', true);
  });
};

export {switchToActiveState, switchToInactiveState};
