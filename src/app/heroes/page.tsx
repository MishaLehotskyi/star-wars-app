'use client';
import { fetchAll } from '@/app/lib/api/api';
import { Hero } from '@/app/lib/types/hero';
import { useEffect, useState } from 'react';
import Pagination from '@/app/ui/components/Pagination';
import HeroList from '@/app/ui/components/HeroList';
import { useSearchParams } from 'next/navigation';
import Loader from '@/app/ui/components/Loader';
import ErrorPage from '@/app/ui/components/ErrorPage';

export default function HeroesPage() {
  const searchParams = useSearchParams();
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [perPage, setPerPage] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const currentPage = +(searchParams.get('page') || 1);
  const visibleHeroes = heroes.slice((currentPage - 1) * perPage, currentPage * perPage);
  const totalPages = Math.ceil(heroes.length / perPage);

  useEffect(() => {
    fetchAll()
      .then(({ heroes, perPage }) => {
        setHeroes(heroes);
        setPerPage(perPage);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }, []);

  if (error) {
    return (<ErrorPage errorMessage="Oops! Failed to load heroes, try again later" />);
  }

  if (showLoader) {
    return (<Loader />);
  }

  return (
    <main className='h-full flex flex-col justify-between'>
      <HeroList list={visibleHeroes}></HeroList>
      <Pagination totalPages={totalPages}></Pagination>
    </main>
  );
};
