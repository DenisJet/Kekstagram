import { isEscEvent } from './util.js';
import {
  resetEditor,
  toScaleSmaller,
  toScaleBigger,
  effectsToggle
} from './img-upload-edit.js';
import { setUploadFormSubmit, onHashtagsInputInput } from './img-upload-validation.js';

const uploadInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = uploadOverlay.querySelector('#upload-cancel');
const scaleControlSmaller = uploadOverlay.querySelector(
  '.scale__control--smaller',
);
const scaleControlBigger = uploadOverlay.querySelector(
  '.scale__control--bigger',
);
const effectsList = uploadOverlay.querySelector('.effects__list');
const effectLevel = uploadOverlay.querySelector('.effect-level');
const hashtagsInput = uploadOverlay.querySelector('.text__hashtags');
const descriptionInput = uploadOverlay.querySelector('.text__description');
const body = document.querySelector('body');
const uploadForm = document.querySelector('.img-upload__form');

// открытие, закрытие окна редактирования изображения

const onUploadEscKeydown = (evt) => {
  if (
    isEscEvent(evt) &&
    !(
      hashtagsInput == document.activeElement ||
      descriptionInput == document.activeElement
    )
  ) {
    evt.preventDefault();
    closeUploadOverlay();
  }
}

const openUploadOverlay = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  resetEditor();
  scaleControlSmaller.addEventListener('click', toScaleSmaller);
  scaleControlBigger.addEventListener('click', toScaleBigger);
  effectLevel.style.visibility = 'hidden';
  effectsList.addEventListener('click', effectsToggle);
  uploadCancelButton.addEventListener('click', closeUploadOverlay);
  document.addEventListener('keydown', onUploadEscKeydown);
  uploadForm.addEventListener('submit', setUploadFormSubmit);
  hashtagsInput.addEventListener('input', onHashtagsInputInput)
};

const closeUploadOverlay = () => {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadInput.value = '';
  scaleControlSmaller.removeEventListener('click', toScaleSmaller);
  scaleControlBigger.removeEventListener('click', toScaleBigger);
  effectsList.removeEventListener('click', effectsToggle);
  uploadCancelButton.removeEventListener('click', closeUploadOverlay);
  document.removeEventListener('keydown', onUploadEscKeydown);
  uploadForm.removeEventListener('submit', setUploadFormSubmit);
  hashtagsInput.removeEventListener('input', onHashtagsInputInput)
};

uploadInput.addEventListener('change', () => {
  openUploadOverlay();
});

export { openUploadOverlay, closeUploadOverlay };
