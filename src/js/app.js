import fetchCountries from './fetchCountries';
import { error, Stack } from '@pnotify/core';
import listName from '../templates/list-name-countries.hbs';
import informationOfCountry from '../templates/information-of-country.hbs';

const debounce = require('lodash.debounce');
const inputRef = document.querySelector('#input');
const wrapperRef = document.querySelector('#wrapper');

inputRef.addEventListener('input', debounce(onInputSearch, 500));

function onInputSearch(event) {
  event.preventDefault();
  const searchQuery = inputRef.value;
  if (inputRef.value !== '') {
    fetchCountries(searchQuery).then(resoult).catch(accessError);
  }
}
const accessError = () => {
  const message = 'Error! Please try again later.';
  notice(message);
};

const resoult = resolve => {
  wrapperRef.innerHTML = '';
  if (resolve.length > 10) {
    const message = 'Too many matches found. Please enter a more specific query!';
    notice(message);
    return;
  }

  if (resolve.length >= 2 && resolve.length <= 10) {
    const markup = listName(resolve);
    wrapperRef.insertAdjacentHTML('beforeend', markup);
    return;
  }

  if (resolve.length < 2 && resolve.length > 0) {
    const markup = informationOfCountry(resolve);
    wrapperRef.insertAdjacentHTML('beforeend', markup);
  }
};

const stackBottomModal = new Stack({
  dir1: 'down',
  modal: true,
  firstpos1: 120,
  overlayClose: true,
  context: document.getElementById('container'),
});

function notice(message) {
  error({
    title: 'Too many matches found. Please enter a more specific query!',
    stack: stackBottomModal,
  });
}
