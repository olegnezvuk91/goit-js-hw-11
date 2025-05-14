import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('form');
const gallery = document.querySelector('.gallery');

import { getImagesByQuery } from './js/pixabay-api';
import {
  showLoader,
  hideLoader,
  clearGallery,
  createGallery,
} from './js/render-functions';
let lightbox = null;

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

      const markup = createGallery(res.hits);
      gallery.insertAdjacentHTML('beforeend', markup);

      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
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
