import {createAds} from './data.js';

const TYPE_OF_HOUSING_KEY = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало',
  'hotel': 'Отель',
};

const similarListTemplate = document.querySelector('.map__canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarAds = createAds(1);


const createSimilarList = () => {
  const similarListFragment = document.createDocumentFragment();

  similarAds.forEach(({offer, author}) => {
    const adElement = similarAdTemplate.cloneNode(true);
    adElement.querySelector('.popup__title').textContent = offer.title;
    adElement.querySelector('.popup__text--address').textContent = offer.address;
    adElement.querySelector('.popup__text--price').textContent = `${offer.price } ₽/ночь`;
    adElement.querySelector('.popup__type').textContent = `${TYPE_OF_HOUSING_KEY[offer.type]}`;
    adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}` ;
    adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    adElement.querySelector('.popup__avatar').src = author.avatar;

    if (offer.description.length === 0) {
      adElement.querySelector('.popup__description').style.display = 'none';
    } adElement.querySelector('.popup__description').textContent = offer.description;

    const featureListFragment = document.createDocumentFragment();

    offer.features.forEach((value) => {
      const featureListItem = adElement.querySelector('.popup__features').querySelector(`.popup__feature--${value}`);

      if (featureListItem) {
        featureListFragment.append(featureListItem);
      }
    });
    adElement.querySelector('.popup__features').innerHTML = '';
    adElement.querySelector('.popup__features').append(featureListFragment);

    const photosContainer = adElement.querySelector('.popup__photos');
    photosContainer.innerHTML = '';

    offer.photos.forEach((value) => {
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
  similarListTemplate.appendChild(similarListFragment);
};

createSimilarList();

export {createSimilarList};
