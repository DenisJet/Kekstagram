import { isEscEvent } from './util.js';

const COMMENTS_LOAD_STEP = 5;

const bigPic = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPicCancelElement = bigPic.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const socialCommentsList = bigPic.querySelector('.social__comments');
const commentsLoader = bigPic.querySelector('.comments-loader');
const commentCount = bigPic.querySelector('.social__comment-count');

let commentsLoaded = [];
let commentsCount = COMMENTS_LOAD_STEP;

// функция показа комментариев

const renderComment = (comment) => {
  const commentSimilar = commentTemplate.cloneNode(true);

  commentSimilar.querySelector('.social__picture').src = comment.avatar;
  commentSimilar.querySelector('.social__picture').alt = comment.name;
  commentSimilar.querySelector('.social__text').textContent = comment.message;

  return commentSimilar;
};

const renderComments = (comments) => {

  const onCommentsLoaderClick = () => {
    renderComments(comments);
  }

  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);
  socialCommentsList.innerHTML = '';
  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;

  let commentsListFragment = document.createDocumentFragment();

  commentsLoaded.forEach(comment => {
    commentsListFragment.appendChild(renderComment(comment));
  })

  socialCommentsList.appendChild(commentsListFragment);

  if (comments.length > COMMENTS_LOAD_STEP && commentsLoaded.length < comments.length) {
    commentsLoader.classList.remove('hidden');
    commentsLoader.addEventListener('click', onCommentsLoaderClick, { once: true })
  } else {
    commentsLoader.classList.add('hidden');
  }

  commentsCount += COMMENTS_LOAD_STEP;
}

// функция вывода большой картинки

const closeBigPic = () => {
  bigPic.classList.add('hidden');
  body.classList.remove('modal-open');
  socialCommentsList.innerHTML = '';
  bigPicCancelElement.removeEventListener('click', closeBigPic);
  document.removeEventListener('keydown', onBigPicEscKeyDown);
  commentsLoaded = [];
  commentsCount = COMMENTS_LOAD_STEP;
}

const onBigPicEscKeyDown = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPic()
  }
}

const showBigPic = (pic) => {
  commentsCount = COMMENTS_LOAD_STEP;
  commentsLoaded = [];
  body.classList.add('modal-open');
  bigPic.querySelector('.big-picture__img > img').src = pic.url;
  bigPic.querySelector('.likes-count').textContent = pic.likes;
  renderComments(pic.comments.slice());
  bigPic.querySelector('.social__caption').textContent = pic.description;

  document.addEventListener('keydown', onBigPicEscKeyDown)

  bigPicCancelElement.addEventListener('click', closeBigPic);

  bigPic.classList.remove('hidden');
};

export {showBigPic};
