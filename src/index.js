import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const info = document.querySelector('.country-info');

const languages = {
    eng: "English",
    smo: "Samoan",
};
    
console.log();

input.addEventListener("input", debounce(searchFunction, DEBOUNCE_DELAY));

function searchFunction() {
    const value = input.value.trim();
    list.innerHTML = '';
    info.innerHTML = '';
    if (!value) {
        return;
    }
    fetchCountries(value).then((data) => {
        console.log(data);
        if (data.length > 10) {
            return console.log("Too many matches found. Please enter a more specific name.");
        }
        if (data.length > 1 && data.length <= 10) {
            renderList(data);
            return;
        }
        if (data.length === 1) {
            const markup = countryCard(data);
            info.innerHTML = markup;
            return;
        }
    });
}

function renderList(data) {
    const markup = data.map(({ name, flags }) => {
        return `<li>
        <img src="${flags.svg}" alt="${name.common}">
        <p>${name.official}</p>
      </li>`
    }).join("");
    list.insertAdjacentHTML("beforeend", markup);
}

function countryCard({ name, flags, capital, languages, population }) {
    console.log(flags);
    const language = Object.values({...languages});
    const langString = language.join(", ");
    return infocard = `<div class="country"
        ><img src="${flags.svg}" alt="${name.common}" />
        <p class="country-name">${name.official}</p>
      </div>
      <ul class="info-list">
        <li class="info-list__item"><span class="info-list__span">Capital : </span>${capital}</li>
        <li class="info-list__item"><span class="info-list__span">Population : </span>${population}</li>
        <li class="info-list__item"><span class="info-list__span">Languages : </span>${langString}</li>
      </ul>`;
}