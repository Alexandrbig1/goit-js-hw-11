export const BASE_URL = 'https://pixabay.com/api/';
export const API_KEY = '39155276-6bb78cfc3029a8ff9cc1c0e7d';
export const options = {
  params: {
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: 1,
    q: '',
  },
};
