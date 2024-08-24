import {ListColors} from '../components/ColorList';

export default async function Home() {
  return (
    <div>
      <ListColors itemsPerPage={5} />
    </div>
  );
}
