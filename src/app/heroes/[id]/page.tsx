'use client';
import { useEffect, useState } from 'react';
import { fetchDetailsById } from '@/app/lib/api/api';
import { usePathname } from 'next/navigation';
import { Hero } from '@/app/lib/types/hero';
import Flow from '@/app/ui/components/Flow';
import { Film } from '@/app/lib/types/film';
import { Ship } from '@/app/lib/types/ship';
import Loader from '@/app/ui/components/Loader';
import ErrorPage from '@/app/ui/components/ErrorPage';

export default function HeroPage() {
  const pathname = usePathname();
  const id = pathname.replace('/heroes/', '');
  const [hero, setHero] = useState<Hero | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [ships, setShips] = useState<Ship[]>([]);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDetailsById(id)
      .then(({ hero, films, ships }) => {
        setHero(hero);
        setFilms(films);
        setShips(ships);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, []);

  if (error) {
    return(
      <ErrorPage errorMessage="Oops! Failed to load details, try again later" />
    );
  }

  if (showLoader) {
    return <Loader />;
  }

  return (<Flow hero={hero} films={films} ships={ships}/>);
}
