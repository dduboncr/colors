import React from 'react';
import Image from 'next/image';
export const ColorItem = ({name, colorsequence, photourl}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="flex items-center px-6 py-4">
        <Image
          src={photourl}
          alt={name}
          width={100}
          height={100}
          className="rounded-full h-12 w-12 mr-4"
        />

        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{colorsequence}</p>
        </div>
      </div>
    </div>
  );
};
