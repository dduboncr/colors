import {ListColors} from './components/ColorList';

export type Logos = {
  id: number;
  name: string;
  colorsequences: string;
  photourl: string;
};

export default async function Home() {
  return (
    <div>
      <ListColors itemsPerPage={5} />
    </div>
  );
}
