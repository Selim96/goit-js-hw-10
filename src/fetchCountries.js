import Notiflix from 'notiflix';

const BASE_URL = 'https://restcountries.com';

const FIELDS = 'name,capital,population,flags,languages';

export function fetchCountries(name) {
    
    return fetch(`${BASE_URL}/v3.1/name/${name}?fields=${FIELDS}`).then(responce => {
        if (responce.ok) {
            return responce.json();
        }
        return Promise.reject(new Error('Oops, there is no country with that name'));
    });
};

async function fetchCountriesAsync(name) {
    try {
        const responce = await fetch(`${BASE_URL}/v3.1/name/${name}?fields=${FIELDS}`);
        if (responce.ok) {
            const country = await responce.json;
            return country;
        }
    } catch (error) {
        console.log()
    }
    
}