import {ListColors} from './components/ColorList';

export type Logos = {
  name: string;
  colorsequences: string;
  photourl: string;
};

export default async function Home() {
  const response = await fetch(`${process.env.URL}/api/colors`, {
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
