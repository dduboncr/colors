'use client';
import React, {useState} from 'react';
import ColorItem from './ColorItem';
import AddColorForm from './AddColorForm';

export const ListColors = ({colors, itemsPerPage = 5}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [colorList, setColorList] = useState(colors);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newColor, setNewColor] = useState({
    name: '',
    colorSequence: '',
    photo: '',
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const filteredColors = colorList.filter((color) =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentColors = filteredColors.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(filteredColors.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setNewColor((prevColor) => ({
      ...prevColor,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setNewColor((prevColor) => ({
        ...prevColor,
        photo: e.target.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleAddColor = (event) => {
    event.preventDefault();
    const colorSequenceArray = newColor.colorSequence
      .split(',')
      .map((color) => color.trim());
    setColorList((prevColors) => [
      ...prevColors,
      {...newColor, colorSequence: colorSequenceArray},
    ]);
    setNewColor({name: '', colorSequence: '', photo: ''});
    setIsFormVisible(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md mb-4 flex justify-between items-center">
        <input
          id="search"
          type="text"
          placeholder="Buscar logos..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={toggleFormVisibility}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Añadir Logo
        </button>
      </div>
      {isFormVisible ? (
        <AddColorForm
          newColor={newColor}
          handleInputChange={handleInputChange}
          handleAddColor={handleAddColor}
          handleImageChange={handleImageChange}
        />
      ) : (
        <>
          {currentColors.map((color, index) => (
            <ColorItem
              key={index}
              name={color.name}
              colorSequence={color.colorSequence}
              photo={color.photo}
            />
          ))}
          <div className="flex justify-between items-center w-full max-w-md mt-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Atrás
            </button>
            <span className="px-4 py-2">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
};
