import { Hero } from "@/app/lib/types/hero";
import Link from "next/link";

export default function HeroList({ list } : { list: Hero[] }) {
  return (
    <ul className='max-w-screen-xl mx-auto flex flex-row flex-wrap justify-center gap-4 py-4'>
      {list.map(hero => (
        <li
          key={hero.name}
          className='w-48 rounded overflow-hidden
          shadow-lg m-2 hover:shadow-xl transition duration-300
          ease-in-out transform hover:-translate-y-1 hover:scale-105'
        >
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-4 h-[3rem]">{hero.name}</div>
            <Link
              href={hero.url.replace('https://sw-api.starnavi.io/people', 'heroes')}
              className="bg-blue-500 hover:bg-blue-600
              text-white font-semibold py-2 px-4
              rounded-full shadow-lg"
            >
              Details
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
};
