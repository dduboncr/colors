'use client';
import React, {useState} from 'react';
import {ColorItem} from './ColorItem';
import AddColorForm from './AddColorForm';
import {useRouter} from 'next/navigation';
import {PaginationControls} from './PaginationControl';
import {Spinner} from './Spinner';

export const ListColors = ({colors, itemsPerPage = 5}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [colorList, setColorList] = useState(colors);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newColor, setNewColor] = useState({
    name: '',
    colorsequence: '',
    photourl: '',
    id: '',
  });

  const [showList, setShowList] = useState(true);

  const router = useRouter();

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

  const handleAddColor = async (event) => {
    event.preventDefault();
    const colorSequenceArray = newColor.colorsequence
      .split(',')
      .map((color) => color.trim());

    setColorList((prevColors) => [
      ...prevColors,
      {...newColor, colorsequence: colorSequenceArray},
    ]);

    await fetch('/api/colors', {
      method: 'POST',
      body: JSON.stringify(newColor),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    setNewColor({name: '', colorsequence: '', photourl: '', id: ''});
    setIsFormVisible(false);
    router.push('/');
  };

  const handleDeleteColor = async (id) => {
    setShowList(false);
    await fetch(`/api/colors?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache',
    });

    router.push('/');
    setShowList(true);
  };

  return (
    <div className="flex flex-col items-center">
      {isFormVisible ? (
        <AddColorForm
          setNewColor={setNewColor}
          newColor={newColor}
          handleAddColor={handleAddColor}
        />
      ) : (
        <>
          <div className="w-full mt-4 max-w-md mb-6 flex items-">
            <div>
              <input
                id="search"
                type="text"
                placeholder="Buscar logos..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <button
                onClick={toggleFormVisibility}
                className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Agregar Logo
              </button>
            </div>
          </div>
          {showList ? (
            currentColors.map((color, index) => {
              return (
                <ColorItem
                  key={index}
                  name={color.name}
                  colorsequences={color.colorsequences}
                  photourl={color.photourl}
                  id={color.id}
                  handleDeleteColor={handleDeleteColor}
                />
              );
            })
          ) : (
            <Spinner />
          )}
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  );
};
