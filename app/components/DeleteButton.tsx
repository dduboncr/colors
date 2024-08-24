export const DeleteButton = ({
  id,
  handleDeleteColor,
}: {
  id: number;
  handleDeleteColor: (id: number) => void;
}) => {
  return (
    <button
      onClick={() => handleDeleteColor(id)}
      className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-700 ml-4"
    >
      Eliminar
    </button>
  );
};
