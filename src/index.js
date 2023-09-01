import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { elements } from './elements';
import { BASE_URL, options } from './api';

const { galleryEl, searchInput, searchForm, loaderEl } = elements;

let totalHits = 0;
let isLoadingMore = false;
let reachedEnd = false;

const lightbox = new SimpleLightbox('.lightbox', {
  captionsData: 'alt',
  captionDelay: 250,
  enableKeyboard: true,
  showCounter: false,
  scrollZoom: false,
  close: false,
});

searchForm.addEventListener('submit', onFormSybmit);
window.addEventListener('scroll', onScrollHandler);
document.addEventListener('DOMContentLoaded', hideLoader);

function showLoader() {
  loaderEl.style.display = 'block';
}

function hideLoader() {
  loaderEl.style.display = 'none';
}

function renderGallery(hits) {
  const markup = hits
    .map(item => {
      return `
            <a href="${item.largeImageURL}" class="lightbox">
                <div class="photo-card">
                    <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${item.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${item.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${item.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${item.downloads}
                        </p>
                    </div>
                </div>
            </a>
            `;
    })
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', markup);

  if (options.params.page * options.params.per_page >= totalHits) {
    if (!reachedEnd) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      reachedEnd = true;
    }
  }
  lightbox.refresh();
}

async function loadMore() {
  isLoadingMore = true;
  options.params.page += 1;
  try {
    showLoader();
    const response = await axios.get(BASE_URL, options);
    const hits = response.data.hits;
    renderGallery(hits);
  } catch (err) {
    Notify.failure(err);
    hideLoader();
  } finally {
    hideLoader();
    isLoadingMore = false;
  }
}

function onScrollHandler() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  const scrollThreshold = 300;
  if (
    scrollTop + clientHeight >= scrollHeight - scrollThreshold &&
    galleryEl.innerHTML !== '' &&
    !isLoadingMore &&
    !reachedEnd
  ) {
    loadMore();
  }
}

async function onFormSybmit(e) {
  e.preventDefault();
  options.params.q = searchInput.value.trim();
  if (options.params.q === '') {
    return;
  }
  options.params.page = 1;
  galleryEl.innerHTML = '';
  reachedEnd = false;

  try {
    showLoader();
    const response = await axios.get(BASE_URL, options);
    totalHits = response.data.totalHits;
    const hits = response.data.hits;
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderGallery(hits);
    }
    searchInput.value = '';
    hideLoader();
  } catch (err) {
    Notify.failure(err);
    hideLoader();
  }
}
