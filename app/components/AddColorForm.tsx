import React from 'react';

const AddColorForm = ({
  newColor,
  handleInputChange,
  handleAddColor,
  handleImageChange,
}) => {
  return (
    <form className="w-full max-w-md mt-4" onSubmit={handleAddColor}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Nombre del Logo
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ingrese el nombre del color"
          value={newColor.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="colorSequence"
        >
          Secuencia de Colores (separados por comas)
        </label>
        <input
          id="colorSequence"
          name="colorSequence"
          type="text"
          placeholder="Ingrese los colores separados por comas"
          value={newColor.colorSequence}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="photo"
        >
          Logo
        </label>
        <input
          id="photo"
          name="photo"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Añadir Color
      </button>
    </form>
  );
};

export default AddColorForm;
