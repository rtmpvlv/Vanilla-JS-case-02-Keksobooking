const renderAd = (ad) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
  const newAdd = cardTemplate.cloneNode(true);
  const featuresList = newAdd.querySelector('.popup__features');
  const photosList = newAdd.querySelector('.popup__photos');

  const {author, offer} = ad;

  if (!author.avatar || author.avatar === 'img/avatars/user10.png' || author.avatar === 'img/avatars/user09.png' || author.avatar === 'img/avatars/user11.png') {
    newAdd.querySelector('.popup__avatar').src = 'img/avatars/default.png';
  } else {
    newAdd.querySelector('.popup__avatar').src = author.avatar;
  }
  offer.title ? newAdd.querySelector('.popup__title').textContent = offer.title : newAdd.querySelector('.popup__title').textContent = '';
  offer.address ? newAdd.querySelector('.popup__text--address').textContent = offer.address : newAdd.querySelector('.popup__text--address').textContent = '';
  offer.price ? newAdd.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь` : newAdd.querySelector('.popup__text--price').textContent = '';
  if (offer.rooms && offer.guests) {
    newAdd.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнат для ${offer.guests} гостей.`;
  } else {
    newAdd.querySelector('.popup__text--capacity').textContent = '';
  }
  if (offer.checkin && offer.checkout) {
    newAdd.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}.`;
  } else {
    newAdd.querySelector('.popup__text--time').textContent = '';
  }
  offer.description ? newAdd.querySelector('.popup__description').textContent = offer.description : newAdd.querySelector('.popup__description').textContent = '';

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
    featuresList.innerHTML = '';

    features.forEach(item => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + item);
      featuresList.appendChild(feature);
    });
  };

  offer.features ? getAvailableFeatures(offer.features) : featuresList.innerHTML = '';

  const getOfferPhotos = (offerPhotos) => {
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

  offer.photos ? getOfferPhotos(offer.photos) : photosList.innerHTML = '';
  return newAdd;
};

export {
  renderAd
};
