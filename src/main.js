import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('form');

import { getImagesByQuery } from './js/pixabay-api';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
} from './js/render-functions';

form.addEventListener('submit', e => {
  e.preventDefault();
  clearGallery();
  showLoader();

  const input = e.currentTarget.elements['search-text'].value.trim();

  if (!input) {
    hideLoader();
    return iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
  }

  getImagesByQuery(input)
    .then(res => {
      if (res.hits.length === 0) {
        return iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
      }

      createGallery(res.hits);
    })
    .catch(err => {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader();
      form.reset();
    });
});
