const adForm = document.querySelector('.ad-form');
const adFormHeader = adForm.querySelector('.ad-form-header');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');

const notActiveState = () => {
  adForm.classList.add('ad-form--disabled');
  adFormHeader.disabled = true;
  adFormElements.forEach(item => item.disabled = true);
  mapFiltersForm.classList.add('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select').forEach(item => item.disabled = true);
  mapFiltersForm.querySelector('fieldset').disabled = true;
};

const activeState = () => {
  adForm.classList.remove('ad-form--disabled');
  adFormHeader.disabled = false;
  adFormElements.forEach(item => item.disabled = false);
  mapFiltersForm.classList.remove('map__filters--disabled');
  mapFiltersForm.querySelectorAll('select').forEach(item => item.disabled = false);
  mapFiltersForm.querySelector('fieldset').disabled = false;
};

export { notActiveState, activeState };
