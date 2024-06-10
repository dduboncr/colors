import React from 'react';
import Image from 'next/image';
const ColorItem = ({name, colorSequence, photo}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <div className="flex items-center px-6 py-4">
        <Image
          src={photo}
          alt={name}
          width={128}
          height={128}
          className="rounded-full"
        />

        <div>
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{colorSequence.join(', ')}</p>
        </div>
      </div>
    </div>
  );
};

export default ColorItem;
