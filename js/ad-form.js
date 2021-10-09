const adFormAddress = document.querySelector('#address');
adFormAddress.value = '35.68170, 139.75389';

const adFormGetAddress = (lat, lng) => {
  adFormAddress.readOnly = true;
  adFormAddress.value = `${lat}, ${lng}`;
};

const setFiltering = () => {

  const adFormTitle = document.querySelector('#title');
  const adFormTypeOfLiving = document.querySelector('#type');
  const adFormPrice = document.querySelector('#price');
  const adFormTimein = document.querySelector('#timein');
  const adFormTimeout = document.querySelector('#timeout');
  const adFormRoomQuantity = document.querySelector('#room_number');
  const adFormCapacity = document.querySelector('#capacity');

  const setValidationOnTitle = (title) => {
    title.addEventListener('input', () => {
      if (title.validity.tooShort) {
        title.setCustomValidity('Заголовок должен состоять минимум из 30 символов.');
      } else if (title.validity.tooLong) {
        title.setCustomValidity('Заголовок не должен превышать 100 символов.');
      } else {
        title.setCustomValidity('');
      }
      title.reportValidity();
    });
  };
  setValidationOnTitle(adFormTitle);

  adFormTypeOfLiving.value = 'bungalow';
  adFormPrice.value = 0;
  adFormPrice.min = 0;

  adFormTypeOfLiving.addEventListener('change', () => {

    const changePrice = (price) => {
      adFormPrice.value = price;
      adFormPrice.placeholder = price;
      adFormPrice.min = price;
    }
    switch(adFormTypeOfLiving.value) {
      case 'bungalow':
        changePrice(0);
        break;
      case 'flat':
        changePrice(1000);
        break;
      case 'house':
        changePrice(5000);
        break;
      case 'palace':
        changePrice(10000);
        break;
    }
  });

  const syncTimeinAndTimeout = (time1, time2) => {
    time1.addEventListener('change', () => {
      switch(time1.value) {
        case '12:00':
          time2.options[0].selected = true;
          break;
        case '13:00':
          time2.options[1].selected = true;
          break;
        case '14:00':
          time2.options[2].selected = true;
          break;
      }
    });
  };

  syncTimeinAndTimeout(adFormTimein, adFormTimeout);
  syncTimeinAndTimeout(adFormTimeout, adFormTimein);

  const syncRoomsAndGuests = (rooms, guests) => {

    guests.options[0].disabled = true;
    guests.options[1].disabled = true;
    guests.options[2].selected = true;
    guests.options[3].disabled = true;

    rooms.addEventListener('change', () => {
      switch (rooms.value) {
        case '1':
          guests.options[0].disabled = true;
          guests.options[1].disabled = true;
          guests.options[2].selected = true;
          guests.options[3].disabled = true;
          break;
        case '2':
          guests.options[0].disabled = true;
          guests.options[1].disabled = false;
          guests.options[2].selected = true;
          guests.options[3].disabled = true;
          break;
        case '3':
          guests.options[0].disabled = false;
          guests.options[1].disabled = false;
          guests.options[2].selected = true;
          guests.options[3].disabled = true;
          break;
        case '100':
          guests.options[0].disabled = true;
          guests.options[1].disabled = true;
          guests.options[2].disabled = true;
          guests.options[3].selected = true;
          break;
      }
    });
  };
  syncRoomsAndGuests(adFormRoomQuantity, adFormCapacity);
};

export {
  setFiltering,
  adFormGetAddress
};
