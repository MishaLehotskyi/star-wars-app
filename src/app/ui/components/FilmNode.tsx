import { Film } from '@/app/lib/types/film';
import { Handle, Position } from 'reactflow';
import { GiFilmProjector } from 'react-icons/gi';

interface Props {
  data: { filmSourceHandleIds: string[], film: Film },
  isConnectable: boolean,
}

export default function FilmNode({ data, isConnectable }: Props) {
  const { title, episode_id, director, producer, release_date, opening_crawl } = data.film;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <Handle type="target" position={Position.Top}></Handle>
      <div className="flex">
        <h2 className="text-lg font-semibold">{title}</h2>
        <GiFilmProjector className='w-8 h-8 ml-auto' />
      </div>
      <div className="mt-2">
        <p>Episode: {episode_id}</p>
        <p>Director: {director}</p>
        <p>Producer: {producer}</p>
        <p>Release Date: {release_date}</p>
        <div className="mt-2">
          <p className="font-semibold">Opening Crawl:</p>
          <p className="text-sm">{opening_crawl}</p>
        </div>
      </div>
      {data.filmSourceHandleIds.map(id => <Handle key={id} type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />)}
    </div>
  );
}
