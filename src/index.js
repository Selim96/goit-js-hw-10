import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

input.style.border = "4px solid rgba(200, 80, 50)";
input.style.backgroundColor = "#c0d49f"

input.addEventListener("input", debounce(searchFunction, DEBOUNCE_DELAY));

function searchFunction() {
    const value = input.value.trim();
    list.innerHTML = '';
    info.innerHTML = '';
    if (!value) {
        return;
    }
    fetchCountries(value).then((data) => {
        
        if (data.length > 10) {
            return Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        }
        if (data.length > 1 && data.length <= 10) {
            renderList(data);
            return;
        }
        if (data.length === 1) {
            
            countryCard(data);
            return;
        }
    }).catch(err => Notiflix.Notify.failure(err.message));
}

function renderList(data) {
    const markup = data.map(({ name, flags }) => {
        return `<li class="country__item">
        <img src="${flags.svg}" alt="${name.common}">
        <p class="country__name">${name.official}</p>
      </li>`
    }).join("");
    list.insertAdjacentHTML("beforeend", markup);
}

function countryCard(data) {
    const { name, flags, capital, languages, population } = data[0];
    const languagesArr = Object.values({...languages});
    const langString = languagesArr.join(", ");
    
    const infocard = `<div class="country"
        ><img src="${flags.svg}" alt="${name.common}" />
        <p class="country__id">${name.official}</p>
      </div>
      <ul class="info-list">
        <li class="info-list__item"><span class="info-list__span">Capital : </span>${capital[0]}</li>
        <li class="info-list__item"><span class="info-list__span">Population : </span>${population}</li>
        <li class="info-list__item"><span class="info-list__span">Languages : </span>${langString}</li>
      </ul>`;
    info.innerHTML = infocard;
}