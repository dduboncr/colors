import {ListColors} from './components/ColorList';
import {sql} from '@vercel/postgres';

type Logos = {
  name: string;
  colorSequence: string;
  photoUrl: string;
};

export default async function Home() {
  const {rows} = await sql<Logos>`SELECT * from logos`;

  return (
    <div>
      <ListColors colors={rows} itemsPerPage={10} />
    </div>
  );
}
