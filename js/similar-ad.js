import {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getNewRandomArray
} from './util.js';

const SIMILAR_ADS_COUNT = 10;

const PRISE = {
  MIN: 1,
  MAX: 100000,
};
const ROOMS = {
  MIN: 1,
  MAX: 100,
};
const GUESTS = {
  MIN: 1,
  MAX: 1000,
};
const TypesOfLiving = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CheckinTime = [
  '12:00',
  '13:00',
  '14:00',
];
const Features = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const Photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const getSimilarAd = () => {

  const randomLongitude = getRandomFloat(35.65000, 35.70000, 5);
  const randomLatitude = getRandomFloat(139.70000, 139.80000, 5);

  return {
    author: {
      avatar: 'img/avatars/user0' + getRandomInteger(1, 8) + '.png',
    },
    offer: {
      title: 'Отличное место для отдыха.',
      address: randomLongitude + ' ' + randomLatitude,
      price: getRandomInteger(PRISE.MIN, PRISE.MAX),
      type: getRandomArrayElement(TypesOfLiving),
      rooms: getRandomInteger(ROOMS.MIN, ROOMS.MAX),
      guests: getRandomInteger(GUESTS.MIN, GUESTS.MAX),
      checkin: getRandomArrayElement(CheckinTime),
      checkout: getRandomArrayElement(CheckinTime),
      features: getNewRandomArray(Features),
      description: 'Отличное помещение. Очень светлое. Много комнат. Отдых тут - просто красота.',
      photos: getNewRandomArray(Photos),
    },
    location: {
      x: randomLongitude,
      y: randomLatitude,
    },
  };
};

const getSimilarAds = () => new Array(SIMILAR_ADS_COUNT).fill(null).map(() => getSimilarAd());

export {
  getSimilarAds
};
