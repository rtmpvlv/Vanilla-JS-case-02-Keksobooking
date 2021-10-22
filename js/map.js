/*global L:readonly*/
/*global _:readonly*/

import { activeAdForm, activeFilterForm } from './state.js';
import { adFormGetAddress } from './ad-form.js';
import { renderAd } from './render-similar-ad.js';
import { getData } from './fetch.js';

const ADS_MAX_QUANTITY = 10;

let adsToRenderSourced = new Array;

const map = L.map('map-canvas');

const mainPinIcon = L.icon ({
  iconUrl:'./img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

let mainPinMarker = L.marker(
  {
    lat: 35.681700,
    lng: 139.753891,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);
mainPinMarker.on('move', (evt) => {
  let lat = evt.target.getLatLng().lat.toFixed(5);
  let lng = evt.target.getLatLng().lng.toFixed(5);
  adFormGetAddress(lat, lng);
});

const resetMainPinMarker = () => {
  mainPinMarker.remove();

  mainPinMarker = L.marker(
    {
      lat: 35.681700,
      lng: 139.753891,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);
  mainPinMarker.on('move', (evt) => {
    let lat = evt.target.getLatLng().lat.toFixed(5);
    let lng = evt.target.getLatLng().lng.toFixed(5);
    adFormGetAddress(lat, lng);
  });
};

let regularPinMarkers = [];
let regularPinMarker1 = L.marker();
let regularPinMarker2 = L.marker();
let regularPinMarker3 = L.marker();
let regularPinMarker4 = L.marker();
let regularPinMarker5 = L.marker();
let regularPinMarker6 = L.marker();
let regularPinMarker7 = L.marker();
let regularPinMarker8 = L.marker();
let regularPinMarker9 = L.marker();
let regularPinMarker10 = L.marker();

regularPinMarkers.push(
  regularPinMarker1,
  regularPinMarker2,
  regularPinMarker3,
  regularPinMarker4,
  regularPinMarker5,
  regularPinMarker6,
  regularPinMarker7,
  regularPinMarker8,
  regularPinMarker9,
  regularPinMarker10,
);

const regularPinIcon = L.icon ({
  iconUrl:'./img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const renderAds = (ads) => {
  regularPinMarkers.forEach(item => item.remove());
  ads.slice(0, ADS_MAX_QUANTITY);
  for (let i = 0; i < 10; i++) {
    if (ads[i]) {
      regularPinMarkers[i] = L.marker(
        {
          lat: ads[i].location.lat,
          lng: ads[i].location.lng,
        },
        {
          icon: regularPinIcon,
        },
      );
      regularPinMarkers[i]
        .addTo(map)
        .bindPopup(renderAd(ads[i]), {keepInView: true})
    } else if (!ads[i]) {
      continue;
    }
  }
}

const getMap = () => {
  map.on('load', () => {
    activeAdForm();
  }).setView([35.681700, 139.753891], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  getData((ads) => {

    adsToRenderSourced = ads.slice();
    let adsToRenderModified = adsToRenderSourced;
    let adsToRenderModifiedWithTypesOfLiving = adsToRenderSourced;
    let adsToRenderModifiedWithPrice = adsToRenderSourced;
    let adsToRenderModifiedWithRooms = adsToRenderSourced;
    let adsToRenderModifiedWithGuests = adsToRenderSourced;
    let adsToRenderModifiedWithFeatures = adsToRenderSourced;

    let adsToRenderModifiedWithWifi = adsToRenderSourced;
    let adsToRenderModifiedWithDishwasher = adsToRenderSourced;
    let adsToRenderModifiedWithParking = adsToRenderSourced;
    let adsToRenderModifiedWithWasher = adsToRenderSourced;
    let adsToRenderModifiedWithElevator = adsToRenderSourced;
    let adsToRenderModifiedWithConditioner = adsToRenderSourced;

    const mapFiltersForm = document.querySelector('.map__filters');
    const housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
    const housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
    const housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
    const housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');
    const housingFeaturesInputs = mapFiltersForm.querySelectorAll('input[type="checkbox"]');

    mapFiltersForm.addEventListener('change', () => {
      adsToRenderModified = adsToRenderSourced.filter(element =>
        adsToRenderModifiedWithPrice.includes(element) &&
        adsToRenderModifiedWithTypesOfLiving.includes(element) &&
        adsToRenderModifiedWithRooms.includes(element) &&
        adsToRenderModifiedWithGuests.includes(element) &&
        adsToRenderModifiedWithFeatures.includes(element))
      renderAdsDebounced(adsToRenderModified);
    });

    const filterTypeOfLiving = () => {
      switch (housingTypeSelect.value) {
        case 'any':
          adsToRenderModifiedWithTypesOfLiving = adsToRenderSourced;
          break;
        case 'palace':
        case 'flat':
        case 'house':
        case 'bungalow':
          adsToRenderModifiedWithTypesOfLiving = adsToRenderSourced.filter((ad) => ad.offer.type === housingTypeSelect.value);
          break;
      }
    };

    const filterPrice = () => {
      switch (housingPriceSelect.value) {
        case 'any':
          adsToRenderModifiedWithPrice = adsToRenderSourced;
          break;
        case 'middle':
          adsToRenderModifiedWithPrice = adsToRenderSourced.filter(ad => ad.offer.price > 10000 && ad.offer.price < 50000);
          break;
        case 'low':
          adsToRenderModifiedWithPrice = adsToRenderSourced.filter(ad => ad.offer.price < 10000);
          break;
        case 'high':
          adsToRenderModifiedWithPrice = adsToRenderSourced.filter(ad => ad.offer.price > 50000);
          break;
      }
    };

    const filterRooms = () => {
      switch (housingRoomsSelect.value) {
        case 'any':
          adsToRenderModifiedWithRooms = adsToRenderSourced;
          break;
        case '1':
          adsToRenderModifiedWithRooms = adsToRenderSourced.filter(ad => ad.offer.rooms == 1);
          break;
        case '2':
          adsToRenderModifiedWithRooms = adsToRenderSourced.filter(ad => ad.offer.rooms == 2);
          break;
        case '3':
          adsToRenderModifiedWithRooms = adsToRenderSourced.filter(ad => ad.offer.rooms == 3);
          break;
      }
    };

    const filterGuests = () => {
      switch (housingGuestsSelect.value) {
        case 'any':
          adsToRenderModifiedWithGuests = adsToRenderSourced;
          break;
        case '2':
          adsToRenderModifiedWithGuests = adsToRenderSourced.filter(ad => ad.offer.guests == 2);
          break;
        case '1':
          adsToRenderModifiedWithGuests = adsToRenderSourced.filter(ad => ad.offer.guests == 1);
          break;
        case '0':
          adsToRenderModifiedWithGuests = adsToRenderSourced.filter(ad => ad.offer.guests == 0);
          break;
      }
    };

    const filterFeatures = (evt) => {

      if (evt.target.checked) {
        switch (evt.target.value) {
          case 'wifi':
            adsToRenderModifiedWithWifi = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('wifi') : false);
            break;
          case 'dishwasher':
            adsToRenderModifiedWithDishwasher = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('dishwasher') : false);
            break;
          case 'parking':
            adsToRenderModifiedWithParking = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('parking') : false);
            break;
          case 'washer':
            adsToRenderModifiedWithWasher = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('washer') : false);
            break;
          case 'elevator':
            adsToRenderModifiedWithElevator = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('elevator') : false);
            break;
          case 'conditioner':
            adsToRenderModifiedWithConditioner = adsToRenderSourced.filter(ad => ad.offer.features ? ad.offer.features.includes('conditioner') : false);
            break;
        }
      } else if (!evt.target.checked) {
        switch (evt.target.value) {
          case 'wifi':
            adsToRenderModifiedWithWifi = adsToRenderSourced;
            break;
          case 'dishwasher':
            adsToRenderModifiedWithDishwasher = adsToRenderSourced;
            break;
          case 'parking':
            adsToRenderModifiedWithParking = adsToRenderSourced;
            break;
          case 'washer':
            adsToRenderModifiedWithWasher = adsToRenderSourced;
            break;
          case 'elevator':
            adsToRenderModifiedWithElevator = adsToRenderSourced;
            break;
          case 'conditioner':
            adsToRenderModifiedWithConditioner = adsToRenderSourced;
            break;
        }
      }

      adsToRenderModifiedWithFeatures = adsToRenderSourced.filter(element =>
        adsToRenderModifiedWithWifi.includes(element) &&
        adsToRenderModifiedWithDishwasher.includes(element) &&
        adsToRenderModifiedWithParking.includes(element) &&
        adsToRenderModifiedWithWasher.includes(element) &&
        adsToRenderModifiedWithElevator.includes(element) &&
        adsToRenderModifiedWithConditioner.includes(element))
    };

    housingTypeSelect.addEventListener('change', filterTypeOfLiving);
    housingPriceSelect.addEventListener('change', filterPrice);
    housingRoomsSelect.addEventListener('change', filterRooms);
    housingGuestsSelect.addEventListener('change', filterGuests);
    housingFeaturesInputs.forEach(feature => feature.addEventListener('change', filterFeatures));

    const renderAdsDebounced = _.debounce(renderAds, 500);
    renderAdsDebounced(adsToRenderModified);
    activeFilterForm();
  });
};

export {
  getMap,
  resetMainPinMarker,
  renderAds,
  adsToRenderSourced
};
