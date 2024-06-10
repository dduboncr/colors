import {ListColors} from './components/ColorList';
import {sql} from '@vercel/postgres';

export type Logos = {
  name: string;
  colorSequence: string;
  photoUrl: string;
};

export default async function Home() {
  const response = await fetch('http://localhost:3000/api/colors', {
    method: 'GET',
    cache: 'no-cache',
  });

  const colors = await response.json();

  return (
    <div>
      <ListColors colors={colors} itemsPerPage={10} />
    </div>
  );
}
