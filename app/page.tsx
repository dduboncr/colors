import {ListColors} from './components/ColorList';

export type Logos = {
  name: string;
  colorsequences: string;
  photourl: string;
};

const getColors = async () => {
  const response = await fetch(`${process.env.URL}/api/colors`, {
    method: 'GET',
    cache: 'no-cache',
  });

  if (!response.ok) {
    console.log('Failed to fetch colors');
    throw new Error('Failed to fetch colors');
  }

  const colors = await response.json();

  return colors;
};

export default async function Home() {
  return (
    <div>
      <ListColors itemsPerPage={5} />
    </div>
  );
}
