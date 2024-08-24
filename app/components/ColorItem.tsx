import Image from 'next/image';
export const ColorItem = ({name, colorsequences, photourl}) => {
  return (
    <>
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

        <div className="flex flex-wrap gap-2 mt-2">
          {colorsequences.split(',').map((color, index) => {
            return (
              <div key={index}>
                {index + 1}. {color}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
