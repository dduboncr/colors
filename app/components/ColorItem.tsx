import Image from 'next/image';

export const ColorItem = ({
  id,
  name,
  colorsequences,
  photourl,
  handleDeleteColor,
}) => {
  return (
    <div className="max-w-md w-full rounded overflow-hidden shadow-lg m-4 w-full">
      <div className="flex-none w-full flex items-center px-6 py-4">
        <Image
          src={photourl}
          alt={name}
          width={100}
          height={100}
          className="rounded-full h-16 w-16 mr-4"
        />

        <div className="flex-grow">
          <div className="font-bold text-xl mb-2">
            {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase() ||
              name.toUpperCase()}
          </div>
          {/* <p className="text-gray-700 text-base">{colorsequences}</p> */}

          <div className="flex flex-wrap gap-2 mt-2">
            {colorsequences.split(',').map((color, index) => {
              return (
                <div key={index}>
                  {index + 1}. {color} <br />
                </div>
              );
            })}
          </div>
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
