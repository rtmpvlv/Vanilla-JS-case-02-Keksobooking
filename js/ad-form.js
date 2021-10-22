import { sendData } from './fetch.js';
import { resetMainPinMarker } from './map.js';
import { isEscEvent } from './util.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const adFormAvatar = adForm.querySelector('#avatar');
const adFormAvatarPreview = document.querySelector('.ad-form-header__preview img');
const adFormTitle = adForm.querySelector('#title');
const adFormAddress = adForm.querySelector('#address');
const adFormTypeOfLiving = adForm.querySelector('#type');
const adFormPrice = adForm.querySelector('#price');
const adFormTimein = adForm.querySelector('#timein');
const adFormTimeout = adForm.querySelector('#timeout');
const adFormRoomQuantity = adForm.querySelector('#room_number');
const adFormCapacity = adForm.querySelector('#capacity');
const adFormFeaturesList = adForm.querySelector('.features');
const adFormDescription = adForm.querySelector('#description');
const adFormHousingFileUpload = adForm.querySelector('#images');
const adFormResetButton = adForm.querySelector('.ad-form__reset');
const adFormPhotoPreview = adForm.querySelector('.ad-form__photo');

const uploadAvatar = () => {
  adFormAvatar.addEventListener('change', () => {
    const file = adFormAvatar.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        adFormAvatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
};
uploadAvatar();

adFormAddress.value = '35.68170, 139.75389';

const adFormGetAddress = (lat, lng) => {
  adFormAddress.readOnly = true;
  adFormAddress.value = `${lat}, ${lng}`;
};

const resetAdFormValues = () => {
  adFormAvatar.value = '';
  adFormTitle.value = '';
  adFormTypeOfLiving.querySelector('option:nth-child(1)').selected = true;
  adFormPrice.value = 0;
  adFormTimein.querySelector('option:nth-child(1)').selected = true;
  adFormTimeout.querySelector('option:nth-child(1)').selected = true;
  adFormRoomQuantity.querySelector('option:nth-child(1)').selected = true;
  adFormCapacity.querySelector('option:nth-child(3)').selected = true;
  adFormFeaturesList.querySelectorAll('.feature__checkbox').forEach(element => {
    element.checked = false;
  });
  adFormDescription.value = '';
  adFormHousingFileUpload.value = '';
  adFormAddress.value = '35.68170, 139.75389';
  resetMainPinMarker();
};

adFormResetButton.addEventListener('click', resetAdFormValues);

const setFiltering = () => {
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

const uploadHousePhoto = () => {
  adFormHousingFileUpload.addEventListener('change', () => {
    const file = adFormHousingFileUpload.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        let image = document.createElement('img');
        image.src = reader.result;
        image.style.maxWidth = '70px';
        image.style.maxHeight = '70px';
        adFormPhotoPreview.appendChild(image);
      });
      reader.readAsDataURL(file);
    }
  });
};
uploadHousePhoto();

const manageSuccessWindow = () => {
  const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  const removeSuccessWindow = () => {
    document.body.removeChild(successMessage);
    document.removeEventListener('click', removeSuccessWindow);
    document.removeEventListener('keydown', escPressedWithSuccessWindow);
  };

  const escPressedWithSuccessWindow = (evt) => {
    if (isEscEvent(evt)) {
      removeSuccessWindow();
    }
  };

  document.addEventListener('keydown', escPressedWithSuccessWindow);
  document.addEventListener('click', removeSuccessWindow);

  document.body.appendChild(successMessage);
};

const manageErrorWindow = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);

  const removeErrorWindow = () => {
    document.body.removeChild(errorMessage);
    document.removeEventListener('click', onClickHandler);
    document.removeEventListener('keydown', escPressedWithErrorWindow);
  };

  const onClickHandler = (evt) => {
    if (evt.target != errorMessage.querySelector('.error__message')) {
      removeErrorWindow();
    }
  };

  const escPressedWithErrorWindow = (evt) => {
    if (isEscEvent(evt)) {
      removeErrorWindow();
    }
  };

  document.addEventListener('keydown', escPressedWithErrorWindow);
  document.addEventListener('click', onClickHandler);

  document.body.appendChild(errorMessage);
};

const setUserFormSubmit = () => {

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        resetAdFormValues();
        manageSuccessWindow();
      },
      () => {
        manageErrorWindow();
      },
      new FormData(evt.target),
    );
  });
};

setUserFormSubmit();

export {
  setFiltering,
  adFormGetAddress
};
