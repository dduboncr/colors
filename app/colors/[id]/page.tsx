import {ColorItem} from '@/app/components/ColorItem';
import {Logos} from '@/app/page';
import {sql} from '@vercel/postgres';
import Link from 'next/link';

export default async function Color({params}: {params: {id: string}}) {
  const logo = await sql<Logos>`SELECT * FROM logos WHERE id = ${params.id}`;

  if (!logo || !logo.rows[0]) return <div>Logo no encontrado</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="w-full mt-4 max-w-md mb-6 flex items-center">
        <div className="max-w-md w-full rounded overflow-hidden shadow-lg m-4 w-full">
          <div className="flex-none w-full flex items-center px-6 py-4">
            <div className="flex flex-col items-center">
              <ColorItem
                name={logo.rows[0].name}
                colorsequences={logo.rows[0].colorsequences}
                photourl={logo.rows[0].photourl}
                key={logo.rows[0].id}
              />
            </div>
            <Link
              href="/colors"
              className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-red-700 ml-4 justify-self-end"
            >
              Volver
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
