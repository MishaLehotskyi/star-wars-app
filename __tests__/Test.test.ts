import getPages from '../src/app/lib/utils/getPages';
import axios from 'axios';
import {
  calculateTotalPages,
  extractHeroesFromResponses,
  fetchAllPages,
  fetchDetailsById,
  fetchPageData,
} from '../src/app/lib/api/api';
import turnDataIntoNodesAndEdges from '../src/app/lib/utils/turnDataIntoNodesAndEdges';
import {Hero} from '@/app/lib/types/hero';
import {Film} from '@/app/lib/types/film';
import {Ship} from '@/app/lib/types/ship';


test('getPages generates an array of numbers from 1 to the specified total', () => {
  const totalPages = 5;
  const result = getPages(totalPages);

  expect(result).toHaveLength(totalPages);
  expect(result).toEqual([1, 2, 3, 4, 5]);
});

jest.mock('axios');

const mockBaseUrl = 'https://api.example.com/';

describe('fetchPageData', () => {
  it('fetches data for a single page', async () => {
    const mockPageData = { count: 10, results: [{ name: 'Hero 1' }, { name: 'Hero 2' }] };
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockPageData });

    const result = await fetchPageData(mockBaseUrl, 1);

    expect(result).toEqual(mockPageData);
  });
});

describe('calculateTotalPages', () => {
  it('calculates total pages', () => {
    const count = 10;
    const perPage = 2;
    const expectedTotalPages = 5;

    const result = calculateTotalPages(count, perPage);

    expect(result).toBe(expectedTotalPages);
  });
});

describe('fetchAllPages', () => {
  it('fetches data for all pages', async () => {
    const mockResponses = [
      { results: [{ name: 'Hero 1' }, { name: 'Hero 2' }] },
      { results: [{ name: 'Hero 3' }, { name: 'Hero 4' }] }
    ];
    for (let i = 1; i <= mockResponses.length; i++) {
      (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponses[i - 1] });
    }

    const result = await fetchAllPages(mockBaseUrl, 2);

    expect(result).toEqual(mockResponses);
  });
});

describe('extractHeroesFromResponses', () => {
  it('extracts heroes from responses', () => {
    const mockResponses = [
      { results: [{ name: 'Hero 1' }, { name: 'Hero 2' }] },
      { results: [{ name: 'Hero 3' }, { name: 'Hero 4' }] }
    ];
    const expectedHeroes = [
      { name: 'Hero 1' },
      { name: 'Hero 2' },
      { name: 'Hero 3' },
      { name: 'Hero 4' }
    ];

    const result = extractHeroesFromResponses(mockResponses);

    expect(result).toEqual(expectedHeroes);
  });
});

describe('fetchDetailsById', () => {
  it('fetches hero details, films, and ships', async () => {
    const heroData = {
      id: '1',
      name: 'Luke Skywalker',
      films: ['1', '2'],
      starships: ['1', '2']
    };

    const film1Data = { title: 'Film 1' };
    const film2Data = { title: 'Film 2' };
    const ship1Data = { id: '1', name: 'Ship 1' };
    const ship2Data = { id: '2', name: 'Ship 2' };

    (axios.get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/people/1')) return Promise.resolve({ data: heroData });
      if (url.includes('/films/1')) return Promise.resolve({ data: film1Data });
      if (url.includes('/films/2')) return Promise.resolve({ data: film2Data });
      if (url.includes('/starships/1')) return Promise.resolve({ data: ship1Data });
      if (url.includes('/starships/2')) return Promise.resolve({ data: ship2Data });
      return Promise.reject(new Error('Invalid URL'));
    });

    const result = await fetchDetailsById('1');

    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/people/1'));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/films/1'));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/films/2'));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/starships/1'));
    expect(axios.get).toHaveBeenCalledWith(expect.stringContaining('/starships/2'));

    expect(result).toEqual({
      hero: heroData,
      films: [film1Data, film2Data],
      ships: [ship1Data, ship2Data]
    });
  });
});

describe('turnDataIntoNodesAndEdges', () => {
  it('correctly generates nodes and edges', () => {
    const hero: Hero = {
      name: 'Jek Tono Porkins',
      height: 180,
      mass: 110,
      hair_color: 'brown',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: 'unknown',
      gender: 'male',
      homeworld: 26,
      films: [1],
      species: [1],
      vehicles: [],
      starships: [12],
      created: '2014-12-12T11:16:56.569000Z',
      edited: '2014-12-20T21:17:50.343000Z',
      url: 'https://sw-api.starnavi.io/people/19/'
    };

    const films: Film[] = [
      {
        title: 'A New Hope',
        episode_id: 4,
        opening_crawl: 'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire\'s\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire\'s\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [10, 12, 13, 14, 15, 16, 18, 19, 1, 2, 3, 4, 5, 6, 7, 8, 9, 81],
        planets: [1, 2, 3],
        starships: [2, 3, 5, 9, 10, 11, 12, 13],
        vehicles: [4, 6, 7, 8],
        species: [1, 2, 3, 4, 5],
        url: 'https://sw-api.starnavi.io/films/1/',
      }
    ];

    const ships: Ship[] = [
      {
        id: 12,
        name: 'X-wing',
        model: 'T-65 X-wing',
        manufacturer: 'Incom Corporation',
        cost_in_credits: '149999',
        length: '12.5',
        max_atmosphering_speed: '1050',
        crew: '1',
        passengers: '0',
        cargo_capacity: '110',
        consumables: '1 week',
        hyperdrive_rating: '1.0',
        MGLT: '100',
        starship_class: 'Starfighter',
      }
    ];

    const result = turnDataIntoNodesAndEdges(hero, films, ships);

    expect(result.heroEdges).toHaveLength(1);
    expect(result.filmNodes).toHaveLength(1);
    expect(result.filmEdges).toHaveLength(1);
    expect(result.shipNodes).toHaveLength(1);
  });
});
