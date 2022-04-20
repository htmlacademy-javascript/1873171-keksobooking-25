const TYPE_OF_HOUSING_KEY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const createSimilarList = (similarAd) => {
  const similarAdTemplateContainer = document.querySelector('#card').content.querySelector('.popup');
  const similarListFragment = document.createDocumentFragment();
  const adContainer = similarAdTemplateContainer.cloneNode(true);


  adContainer.querySelector('.popup__title').textContent = similarAd.offer.title;
  adContainer.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  adContainer.querySelector('.popup__text--price').textContent = `${similarAd.offer.price } ₽/ночь`;
  adContainer.querySelector('.popup__type').textContent = `${TYPE_OF_HOUSING_KEY[similarAd.offer.type]}`;
  adContainer.querySelector('.popup__text--time').textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}` ;
  adContainer.querySelector('.popup__text--capacity').textContent = `${similarAd.offer.rooms} комнаты для ${similarAd.offer.guests} гостей`;
  adContainer.querySelector('.popup__avatar').src = similarAd.author.avatar;

  if (similarAd.offer.description === undefined) {
    adContainer.querySelector('.popup__description').style.display = 'none';
  }
  adContainer.querySelector('.popup__description').textContent = similarAd.offer.description;

  const featureListFragment = document.createDocumentFragment();

  if (similarAd.offer.features === undefined) {
    adContainer.querySelector('.popup__features').style.display = 'none';
  } else {
    similarAd.offer.features.forEach((value) => {
      const featureListItem = adContainer.querySelector('.popup__features').querySelector(`.popup__feature--${value}`);
      if (featureListItem) {
        featureListFragment.append(featureListItem);
      }
    });
    adContainer.querySelector('.popup__features').innerHTML = '';
    adContainer.querySelector('.popup__features').append(featureListFragment);
  }

  const photosContainer = adContainer.querySelector('.popup__photos');

  if (similarAd.offer.photos === undefined) {
    photosContainer.style.display = 'none';
  } else {
    similarAd.offer.photos.forEach((value) => {
      photosContainer.innerHTML = '';
      const photoListItem = document.createElement('img');

      photoListItem.classList.add('.popup__photo');
      photoListItem.src = value;
      photoListItem.alt = 'Фотография жилья';
      photoListItem.style.width = '45px';
      photoListItem.style.height = '40px';

      photosContainer.append(photoListItem);
    });
  }

  similarListFragment.appendChild(adContainer);

  return adContainer;
};

export {createSimilarList};
