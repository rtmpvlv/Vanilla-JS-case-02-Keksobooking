import { getSimilarAds } from './similar-ad.js';

const similarAdds = getSimilarAds();

const renderAd = () => {
  const adContainer = document.querySelector('#map-canvas ');
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  const cardFragment = document.createDocumentFragment();


  similarAdds.forEach(({author, offer}) => {

    const newAdd = cardTemplate.cloneNode(true);

    newAdd.querySelector('.popup__avatar').src = author.avatar;
    newAdd.querySelector('.popup__title').textContent = offer.title;
    newAdd.querySelector('.popup__text--address').textContent = offer.address;
    newAdd.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    newAdd.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей.`;
    newAdd.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
    newAdd.querySelector('.popup__description').textContent = offer.description;

    const typeOfLiving = (offerType) => {
      switch (offerType) {
        case 'flat': return 'Квартира';
        case 'bungalow': return 'Бунгало';
        case 'palace': return 'Дворец';
        case 'house': return 'Дом';
      }
    };

    newAdd.querySelector('.popup__type').textContent = typeOfLiving(offer.type);

    const getAvailableFeatures = (features) => {
      const featuresList = newAdd.querySelector('.popup__features');
      featuresList.innerHTML = '';

      features.forEach(item => {
        const feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + item);
        featuresList.appendChild(feature);
      });
    };

    const getOfferPhotos = (offerPhotos) => {
      const photosList = newAdd.querySelector('.popup__photos');
      photosList.innerHTML = '';

      offerPhotos.forEach(item => {
        const photo = document.createElement('img');
        photo.src = item;
        photo.classList.add('popup__photo');
        photo.width = '45';
        photo.height = '40';
        photo.alt = 'Фотография жилья';
        photosList.appendChild(photo);
      });
    };

    getAvailableFeatures(offer.features);
    getOfferPhotos(offer.photos);

    cardFragment.appendChild(newAdd);
  });

  adContainer.appendChild(cardFragment);
};

export {
  renderAd
}
