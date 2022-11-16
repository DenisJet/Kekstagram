import { createMinPicList } from './miniature-pictures.js';
import { showAlert } from './util.js';
import { closeUploadOverlay } from './img-upload-overlay.js';

// Получение и отправка данных
const imgFilters = document.querySelector('.img-filters');

let picturesData = [];

const getData = () => {
  fetch('https://23.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => {
      picturesData = pictures.slice();
      createMinPicList(pictures);
      imgFilters.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showAlert('Не удалось получить данные. Попробуйте ещё раз (перезагрузите страницу)!');
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://23.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body,
  }).then((response) => {
    closeUploadOverlay();
    if (response.ok) {
      onSuccess();
    } else {
      onFail();
    }
  }).catch(() => {
    closeUploadOverlay();
    onFail();
  })
}

export {getData, sendData, picturesData};
