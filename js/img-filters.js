import { createMinPicList } from './miniature-pictures.js';
import { getRandomArrayElement } from './util.js';
import { picturesData } from './fetch.js';

// фильтр загруженных изображений

const ARR_RANDOMPICS_COUNT = 10;
const RERENDER_DELAY = 500;

const picturesContainer = document.querySelector('.pictures');
const buttonDefault = document.querySelector('#filter-default');
const buttonRandom = document.querySelector('#filter-random');
const buttonDiscussed = document.querySelector('#filter-discussed');

const picturesRemove = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach(picture => {
    picture.remove();
  })
}

const activeClassRemove = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
}

const debounce = (callback, delay) => {
  let timeout;

  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(callback, delay);
  };
};

const onClickButtonDefault = () => {
  picturesRemove();
  activeClassRemove();
  buttonDefault.classList.add('img-filters__button--active');
  createMinPicList(picturesData);
};

const onClickButtonRandom = () => {
  picturesRemove();
  activeClassRemove();
  buttonRandom.classList.add('img-filters__button--active');

  const randomPicturesData = [];

  for (let i = 0; randomPicturesData.length < ARR_RANDOMPICS_COUNT; ++i) {
    const randomElement = getRandomArrayElement(picturesData)

    if (!randomPicturesData.includes((randomElement))) {
      randomPicturesData.push(randomElement);
    }
  }

  createMinPicList(randomPicturesData);
}

const onClickButtonDiscussed = () => {
  picturesRemove();
  activeClassRemove();
  buttonDiscussed.classList.add('img-filters__button--active');
  createMinPicList(picturesData.slice().sort((a, b) => {
    return b.comments.length - a.comments.length;
  }))
}

buttonDefault.addEventListener('click', debounce(onClickButtonDefault, RERENDER_DELAY));
buttonRandom.addEventListener('click', debounce(onClickButtonRandom, RERENDER_DELAY));
buttonDiscussed.addEventListener('click', debounce(onClickButtonDiscussed, RERENDER_DELAY));
