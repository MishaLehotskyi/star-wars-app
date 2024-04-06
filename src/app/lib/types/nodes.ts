import { Hero } from '@/app/lib/types/hero';
import { Film } from '@/app/lib/types/film';
import { Ship } from '@/app/lib/types/ship';

export interface HeroNode {
  id: string,
  data: {
    heroSourceHandleIds: string[],
    hero: Hero | null,
  },
  position: {
    x: number,
    y: number,
  },
  type: string,
}

export interface FilmNode {
  id: string,
  data: {
    filmSourceHandleIds: string[],
    film: Film,
  },
  position: {
    x: number,
    y: number,
  },
  type: string,
}

export interface ShipNode {
  id: string,
  data: {
    shipSourceHandleIds: string[],
    ship: Ship,
  },
  position: {
    x: number,
    y: number,
  },
  type: string,
}
