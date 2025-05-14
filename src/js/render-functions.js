const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');

export function showLoader() {
  loader.classList.remove('visually-hidden');
}

export function hideLoader() {
  loader.classList.add('visually-hidden');
}
export function clearGallery() {
  gallery.innerHTML = '';
}

export function createGallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class="gallery-item">
    <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" title=""/></a>
    <div class="cont">
      <p><b>Likes</b><br>${likes}</p>
      <p><b>Views</b><br>${views}</p>
      <p><b>Comments</b><br>${comments}</p>
      <p><b>Downloads</b><br>${downloads}</p>
    </div>
</li>`
    )
    .join('');
}
