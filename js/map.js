/* global L:readonly */

import { activeState } from './state.js';
import { adFormGetAddress } from './ad-form.js';
import { similarAdds } from './main.js';
import { renderAd } from './render-similar-ad.js';

const getMap = () => {
  const map = L.map('map-canvas').on('load', () => {
    activeState();
  }).setView([35.681700, 139.753891], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const mainPinIcon = L.icon ({
    iconUrl:'./img/main-pin.svg',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });

  const regularPinIcon = L.icon ({
    iconUrl:'./img/pin.svg',
    iconSize: [36, 36],
    iconAnchor: [18, 36],
  });

  const mainPinMarker = L.marker(
    {
      lat: 35.681700,
      lng: 139.753891,
    },
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  similarAdds.forEach((point) => {

    const {location} = point;

    const regularPinMarker = L.marker(
      {
        lat: location.x,
        lng: location.y,
      },
      {
        icon: regularPinIcon,
      },
    );
    regularPinMarker
      .addTo(map)
      .bindPopup(renderAd(
        point),
      {
        keepInView: true,
      },
      )
  });

  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    let lat = evt.target.getLatLng().lat.toFixed(5);
    let lng = evt.target.getLatLng().lng.toFixed(5);
    adFormGetAddress(lat, lng);
  });

};

export { getMap };
