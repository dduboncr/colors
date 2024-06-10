import {Color} from './components/ColorItem';
import {ListColors} from './components/ColorList';

export default async function Home() {
  const data = await fetch('http://localhost:3000/api/colors', {
    cache: 'no-cache',
  });

  const colors = await data.json();

  return (
    <div>
      <ListColors colors={colors} itemsPerPage={10} />
    </div>
  );
}
