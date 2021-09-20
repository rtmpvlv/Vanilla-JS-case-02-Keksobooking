'use strict';

const getRandomInteger = (min, max) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return Math.floor(Math.random()*(max + 1 - min) + min);
};

const getRandomFloat = (min, max, lengthAfterThePoint) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return (Math.random()*(max-min) + min).toFixed(lengthAfterThePoint);
};

const getRandomArrayElement = (elements) => elements[_.random(0, elements.length - 1)];
const getNewRandomArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  newArray.length = getRandomInteger(1, array.length);
  return newArray;
};

const TYPE_OF_LIVING = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const randomLongitude = getRandomFloat(35.65000, 35.70000, 5);
const randomLatitude = getRandomFloat(139.70000, 139.80000, 5);

const getSimilarAd = function() {
  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: 'Отличное место для отдыха.',
      address: randomLongitude + ' ' + randomLatitude,
      price: getRandomInteger(0, Infinity),
      type: getRandomArrayElement(TYPE_OF_LIVING),
      rooms: getRandomInteger(0, Infinity),
      guests: getRandomInteger(0, Infinity),
      checkin: getRandomArrayElement(CHECK_IN_TIME),
      checkout: getRandomArrayElement(CHECK_IN_TIME),
      features: getNewRandomArray(FEATURES),
      description: 'Отличное помещение. Очень светлое. Много комнат. Отдых тут - просто красота.',
      photos: getNewRandomArray(PHOTOS),
    },
    location: {
      x: randomLongitude,
      y: randomLatitude,
    },
  };
};

const similarAds = new Array(10).fill(null).map(() => getSimilarAd());
