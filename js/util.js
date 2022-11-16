const ALERT_SHOW_TIME = 5000;

// Функция, возвращающая случайное целое число из переданного диапазона включительно

const getRandomNumber = (firstNumber, lastNumber) => {
  if (firstNumber < 0 || lastNumber < 0 || firstNumber >= lastNumber) {
    return -1;
  }

  return (
    Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber
  );
};

//Функция для проверки максимальной длинны строки

const isStringMaxLength = (string, maxLength) => {
  return string.length <= maxLength;
};

// Функция для выбора случайного элемента массива

const getRandomArrayElement = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

// Проверка на нажатую клавишу escape

const Keys = {
  ESC: 'Esc',
  ESCAPE: 'Escape',
};

const isEscEvent = (evt) => {
  return evt.key === Keys.ESCAPE || evt.key === Keys.ESC;
};

// Сообщение об ошибке

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.margin = '25vh 25vw';
  alertContainer.style.lineHeight = '30px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getRandomNumber, isStringMaxLength, getRandomArrayElement, isEscEvent, showAlert};
