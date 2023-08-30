import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

/* <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>; */

/* <button type="button" class="load-more">
  Load more
</button>; */

// const { height: cardHeight } = document
//   .querySelector('.gallery')
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: 'smooth',
// });

// key
// u_s1z2smcxu5

const elements = {
  submitBtn: document.querySelector('button[type="submit"]'),
  galleryEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const { submitBtn, galleryEl, loadMoreBtn } = elements;

// const API_KEY =
//   'https://pixabay.com/api/?key=39155276-6bb78cfc3029a8ff9cc1c0e7d';
let page = 1;

submitBtn.addEventListener('click', onSubmitBtnHandler);

async function onSubmitBtnHandler(e) {
  e.preventDefault();
  const res = await fetch(
    `https://pixabay.com/api/?key=39155276-6bb78cfc3029a8ff9cc1c0e7d&page=${page}&per_page=40`
  );
  const data = await res.json();

  console.log(data.hits);

  markUp();
}

function markUp() {
  // galleryEl.innerHTML = fews;
  loadMoreBtn.classList.remove('is-hidden');
}
