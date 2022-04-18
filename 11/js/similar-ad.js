import './filters.js';

const TYPE_OF_HOUSING_KEY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const createSimilarList = (similarAd) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarListFragment = document.createDocumentFragment();
  const adElement = similarAdTemplate.cloneNode(true);


  adElement.querySelector('.popup__title').textContent = similarAd.offer.title;
  adElement.querySelector('.popup__text--address').textContent = similarAd.offer.address;
  adElement.querySelector('.popup__text--price').textContent = `${similarAd.offer.price } ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = `${TYPE_OF_HOUSING_KEY[similarAd.offer.type]}`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${similarAd.offer.checkin}, выезд до ${similarAd.offer.checkout}` ;
  adElement.querySelector('.popup__text--capacity').textContent = `${similarAd.offer.rooms} комнаты для ${similarAd.offer.guests} гостей`;
  adElement.querySelector('.popup__avatar').src = similarAd.author.avatar;

  if (similarAd.offer.description === undefined) {
    adElement.querySelector('.popup__description').style.display = 'none';
  }
  adElement.querySelector('.popup__description').textContent = similarAd.offer.description;

  const featureListFragment = document.createDocumentFragment();

  if (similarAd.offer.features === undefined) {
    adElement.querySelector('.popup__features').style.display = 'none';
  } else {
    similarAd.offer.features.forEach((value) => {
      const featureListItem = adElement.querySelector('.popup__features').querySelector(`.popup__feature--${value}`);
      if (featureListItem) {
        featureListFragment.append(featureListItem);
      }
    });
    adElement.querySelector('.popup__features').innerHTML = '';
    adElement.querySelector('.popup__features').append(featureListFragment);
  }

  const photosContainer = adElement.querySelector('.popup__photos');

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

  similarListFragment.appendChild(adElement);

  return adElement;
};

export {createSimilarList};
