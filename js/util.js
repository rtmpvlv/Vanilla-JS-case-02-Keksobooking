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

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getNewRandomArray = (array) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  newArray.length = getRandomInteger(1, newArray.length);
  return newArray;
};

export {
  getRandomInteger,
  getRandomFloat,
  getRandomArrayElement,
  getNewRandomArray
};
