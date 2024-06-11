import React from 'react';
import {UploadButton} from '@/app/utils/uploadthing';
import {useRouter} from 'next/navigation';

const AddColorForm = ({newColor, handleAddColor, setNewColor}) => {
  const router = useRouter();
  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setNewColor((prevColor) => ({
      ...prevColor,
      [name]: value,
    }));
  };

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
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            const photoUrl = res[0].url;

            setNewColor((prevColor) => ({
              ...prevColor,
              photo: photoUrl,
            }));

            alert('Carga completada');
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
      <button
        type="submit"
        disabled={!newColor.name || !newColor.colorSequence || !newColor.photo}
        className={`px-4 py-2 ${
          !newColor.name || !newColor.colorSequence || !newColor.photo
            ? 'disabled:opacity-50'
            : ''
        } bg-green-500 text-white rounded`}
      >
        Guardar
      </button>
    </form>
  );
};

export default AddColorForm;
