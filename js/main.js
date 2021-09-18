'use strict';

const getRandomInteger = (min, max) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return Math.floor(Math.random()*(max + 1 - min) + min);
}
alert(getRandomInteger(1, 100));

const getRandomFloat = (min, max, afterDecimalPoint) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return (Math.random()*(max-min) + min).toFixed(afterDecimalPoint);
}
alert(getRandomFloat(1.1, 1.3, 2));

const checkStringLength = (str, maxLength) => {
  return String(str).length <= Number(maxLength);
}
alert(checkStringLength('I\'ve never gonna run.', 32));
