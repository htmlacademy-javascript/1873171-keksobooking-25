import {createAds} from './data.js';

const TYPE_OF_HOUSING_KEY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const similarAds = createAds(10);

const createSimilarList = (ad) => {
  const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
  const similarListFragment = document.createDocumentFragment();
  const adElement = similarAdTemplate.cloneNode(true);

  similarAds.forEach(() => {
    adElement.querySelector('.popup__title').textContent = ad.offer.title;
    adElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    adElement.querySelector('.popup__text--price').textContent = `${ad.offer.price } ₽/ночь`;
    adElement.querySelector('.popup__type').textContent = `${TYPE_OF_HOUSING_KEY[ad.offer.type]}`;
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}` ;
    adElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнаты для ${ad.offer.guests} гостей`;
    adElement.querySelector('.popup__avatar').src = ad.author.avatar;

    if (ad.offer.description.length === 0) {
      adElement.querySelector('.popup__description').style.display = 'none';
    } adElement.querySelector('.popup__description').textContent = ad.offer.description;

    const featureListFragment = document.createDocumentFragment();

    ad.offer.features.forEach((value) => {
      const featureListItem = adElement.querySelector('.popup__features').querySelector(`.popup__feature--${value}`);

      if (featureListItem) {
        featureListFragment.append(featureListItem);
      }
    });
    adElement.querySelector('.popup__features').innerHTML = '';
    adElement.querySelector('.popup__features').append(featureListFragment);

    const photosContainer = adElement.querySelector('.popup__photos');
    photosContainer.innerHTML = '';

    ad.offer.photos.forEach((value) => {
      const photoListItem = document.createElement('img');

      photoListItem.classList.add('.popup__photo');
      photoListItem.src = value;
      photoListItem.alt = 'Фотография жилья';
      photoListItem.style.width = '45px';
      photoListItem.style.height = '40px';

      photosContainer.append(photoListItem);
    });

    similarListFragment.appendChild(adElement);
  });
  return adElement;
};

export {createSimilarList, similarAds};
