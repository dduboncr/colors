import React from 'react';
import Image from 'next/image';

export const ColorItem = ({
  id,
  name,
  colorsequence,
  photourl,
  handleDeleteColor,
}) => {
  return (
    <div className="max-w-md w-full rounded overflow-hidden shadow-lg m-4">
      <div className="flex items-center px-6 py-4">
        <Image
          src={photourl}
          alt={name}
          width={100}
          height={100}
          className="rounded-full h-16 w-16 mr-4"
        />

        <div className="flex-grow">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{colorsequence}</p>
        </div>

        <button
          onClick={() => handleDeleteColor(id)}
          className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 ml-4"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};
