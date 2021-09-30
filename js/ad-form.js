const setFiltering = () => {

  const adFormTypeOfLiving = document.querySelector('#type');
  const adFormPrice = document.querySelector('#price');
  const adFormTimein = document.querySelector('#timein');
  const adFormTimeout = document.querySelector('#timeout');


  const changePrice = (price) => {
    adFormPrice.placeholder = String(price);
    adFormPrice.min = price;
  };

  adFormTypeOfLiving.addEventListener('change', () => {
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

      const option1 = time2.querySelector('option:first-child');
      const option2 = time2.querySelector('option:nth-child(2)');
      const option3 = time2.querySelector('option:nth-child(3)');

      switch(time1.value) {
        case '12:00':
          option1.selected = true;
          break;
        case '13:00':
          option2.selected = true;
          break;
        case '14:00':
          option3.selected = true;
          break;
      }
    });
  };

  syncTimeinAndTimeout(adFormTimein, adFormTimeout);
  syncTimeinAndTimeout(adFormTimeout, adFormTimein);
};

export { setFiltering };
