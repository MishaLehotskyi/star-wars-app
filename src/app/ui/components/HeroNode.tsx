import { Handle, Position } from 'reactflow';
import { Hero } from '@/app/lib/types/hero';
import { PiPersonArmsSpread } from 'react-icons/pi';

interface Props {
  data: { heroSourceHandleIds: string[], hero: Hero },
  isConnectable: boolean,
}

export default function HeroNode({ data, isConnectable }: Props) {
  const { heroSourceHandleIds, hero } = data;
  const { name, height, mass, hair_color, skin_color, eye_color, birth_year, gender, homeworld } = hero;

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <div className='flex'>
        <h2 className="text-lg font-semibold">{name}</h2>
        <PiPersonArmsSpread className='ml-auto w-8 h-8' />
      </div>
      <div className="mt-2">
        <p>Height: {height} cm</p>
        <p>Mass: {mass} kg</p>
        <p>Hair Color: {hair_color}</p>
        <p>Skin Color: {skin_color}</p>
        <p>Eye Color: {eye_color}</p>
        <p>Birth Year: {birth_year}</p>
        <p>Gender: {gender}</p>
        <p>Homeworld: {homeworld}</p>
      </div>
      {heroSourceHandleIds.map(id => <Handle key={id} type="source" position={Position.Bottom} id={id} isConnectable={isConnectable} />)}
    </div>
  );
}
