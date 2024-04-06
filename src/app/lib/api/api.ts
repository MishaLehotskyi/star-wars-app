import axios from 'axios';
import { Hero } from '@/app/lib/types/hero';
import { Film } from '@/app/lib/types/film';
import { Ship } from '@/app/lib/types/ship';

const BASE_URL = 'https://sw-api.starnavi.io/';

export async function fetchAll() {
  const baseUrl = BASE_URL + 'people/';
  const firstPageData = await fetchPageData(baseUrl, 1);

  const totalPages = calculateTotalPages(firstPageData.count, firstPageData.results.length);

  const responses = await fetchAllPages(baseUrl, totalPages);

  const heroes = extractHeroesFromResponses(responses);

  return { heroes, perPage: firstPageData.results.length };
}

export async function fetchPageData(url: string, page: number) {
  const response = await axios.get(`${url}?page=${page}`);
  return response.data;
}

export function calculateTotalPages(count: number, perPage: number) {
  return Math.ceil(count / perPage);
}

export async function fetchAllPages(baseUrl: string, totalPages: number) {
  const promises = [];
  for (let page = 1; page <= totalPages; page++) {
    promises.push(fetchPageData(baseUrl, page));
  }
  return await Promise.all(promises);
}

export function extractHeroesFromResponses(responses: any[]) {
  const heroes: Hero[] = [];
  responses.forEach(response => {
    if (response && response.results) {
      heroes.push(...response.results);
    }
  });
  return heroes;
}

export async function fetchDetailsById(id: string) {
  const hero: Hero = await axios.get(`${BASE_URL + 'people/'}${id}`).then(res => res.data);

  const filmPromises = hero.films.map(film => axios.get(`${BASE_URL + 'films/'}${film}`));
  const shipPromises = hero.starships.map(ship => axios
    .get(`${BASE_URL + 'starships/'}${ship}`)
    .then(res => ({ id: ship, ...res.data })));

  const [filmResponses, shipResponses] = await Promise.all([Promise.all(filmPromises), Promise.all(shipPromises)]);

  const films: Film[] = filmResponses.map(response => response.data);
  const ships: Ship[] = shipResponses.map(response => response);

  return { hero, films, ships };
}
