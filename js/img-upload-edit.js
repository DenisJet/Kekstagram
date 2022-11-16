const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
};

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const scaleControlValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview > img');
const effectSliderElement = document.querySelector('.effect-level__slider');
const effectLevelValueInput = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectNoneInput = document.querySelector('#effect-none');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

// масштабирование изображения

const toScaleSmaller = () => {
  let scale =  parseInt(scaleControlValue.value, 10) - Scale.STEP;

  if (scale <= Scale.MIN) {
    scale = Scale.MIN;
  }

  scaleControlValue.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale / 100})`;
};

const toScaleBigger = () => {
  let scale =  parseInt(scaleControlValue.value, 10) + Scale.STEP;

  if (scale >= Scale.MAX) {
    scale = Scale.MAX;
  }

  scaleControlValue.value = `${scale}%`;
  imgPreview.style.transform = `scale(${scale / 100})`;
};

// Наложение эффектов на изображение

const effectsToggle = (evt) => {
  imgPreview.className = `effects__preview--${evt.target.value}`;
  effectSliderElement.noUiSlider.set(100);  // сброс слайдера при переключении эффекта

  if (imgPreview.classList.contains('effects__preview--none')) {
    effectLevel.style.visibility = 'hidden';
  } else {
    effectLevel.style.visibility = 'visible';
  }
};

// Работа слайдера

const effects = {
  none: () => '',
  chrome: () => `grayscale(${parseInt(effectLevelValueInput.value, 10) * 0.01})`,
  sepia: () => `sepia(${parseInt(effectLevelValueInput.value, 10) * 0.01})`,
  marvin: () => `invert(${effectLevelValueInput.value}%)`,
  phobos: () => `blur(${(parseInt(effectLevelValueInput.value, 10) * 3) * 0.01}px)`,
  heat: () => `brightness(${(parseInt(effectLevelValueInput.value, 10) * 3) * 0.01})`,
}

window.noUiSlider.create(effectSliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },

  start: Slider.MAX,
  step: Slider.STEP,
  connect: 'lower',
});

effectSliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  effectSliderElement.value = unencoded[handle];
  effectLevelValueInput.value = effectSliderElement.value;

  const currentEffect = imgPreview.className.replace('effects__preview--', '');

  if (!currentEffect) {
    imgPreview.style.filter = '';
    return;
  }

  imgPreview.style.filter = effects[currentEffect](effectLevelValueInput.value);
});

// Сброс эффектов

const resetEditor = () => {
  scaleControlValue.value = '100%';
  imgPreview.style.transform = 'scale(1)';
  imgPreview.className = '';
  imgPreview.style.filter = '';
  effectNoneInput.checked = true;
  hashtagsInput.value = '';
  descriptionInput.value = '';
}

// Экспорт

export { resetEditor, toScaleSmaller, toScaleBigger, effectsToggle };
