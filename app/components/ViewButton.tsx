import Link from 'next/link';

export const ViewButton = ({id}: {id: number}) => {
  return (
    <Link
      href={`/colors/${id}`}
      className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-700 ml-4"
    >
      Ver
    </Link>
  );
};
