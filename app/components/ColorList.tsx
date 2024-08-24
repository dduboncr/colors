'use client';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import AddColorForm from './AddColorForm';
import {ColorItem} from './ColorItem';
import {DeleteButton} from './DeleteButton';
import {PaginationControls} from './PaginationControl';
import {Spinner} from './Spinner';
import {ViewButton} from './ViewButton';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const getColors = async (
  searchTerm: string,
  limit: number = 5,
  offset: number = 0
) => {
  let url = `/api/colors?limit=${limit}&offset=${offset}`;

  if (!!searchTerm) {
    url += `&search=${searchTerm}`;
  }

  const response = await fetch(url, {
    method: 'GET',
  });

  if (!response.ok) {
    console.log('Failed to fetch colors');
    throw new Error('Failed to fetch colors');
  }

  const colorsResponse = await response.json();

  return colorsResponse;
};

const addColor = async (newColor) => {
  const url = `/api/colors`;

  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(newColor),
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
};

const deleteColor = async (id: number) => {
  const url = `/api/colors?id=${id}`;
  await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });
};

const useDeleteColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteColor,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['colors']}),
    onError: (error) => {
      console.log('Error deleting color', error);
    },
  });
};

const useAddColor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addColor,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ['colors']}),
    onError: (error) => {
      console.log('Error adding color', error);
    },
  });
};

export const ListColors = ({itemsPerPage = 5}) => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setCurrentPage] = useState(1);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(itemsPerPage);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newColor, setNewColor] = useState({
    name: '',
    colorsequence: '',
    photourl: '',
    id: '',
  });

  const addColor = useAddColor();

  const deleteColor = useDeleteColor();

  const {
    data: colorList,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['colors', debouncedSearch, limit, offset, page],
    queryFn: ({signal}) => {
      return getColors(debouncedSearch, limit, offset);
    },
  });

  React.useEffect(() => {
    if (colorList?.hasMore) {
      queryClient.prefetchQuery({
        queryKey: ['colors', search, limit, offset + limit],
        queryFn: () => getColors(search, limit, offset + limit),
      });
    }
  }, [colorList, colorList?.hasMore, search, limit, offset, page, queryClient]);

  const [showList, setShowList] = useState(true);

  const router = useRouter();

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  if (isLoading) return;
  if (isError) return <div>Error: {error.message}</div>;

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
    setOffset((prev) => prev - offset);
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, itemsPerPage));
    setOffset((prev) => prev + limit);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleAddColor = async (event) => {
    event.preventDefault();

    addColor.mutate(newColor, {
      onSuccess: () => {
        toggleFormVisibility();
        router.push('/');
      },
      onError: (error) => {
        console.log('Error adding color', error);
      },
    });
  };

  const handleDeleteColor = async (id) => {
    setShowList(false);
    deleteColor.mutate(id, {
      onSuccess: () => {
        setShowList(true);
      },
      onError: (error) => {
        console.log('Error deleting color', error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center">
      {isFormVisible ? (
        <AddColorForm
          setNewColor={setNewColor}
          newColor={newColor}
          handleAddColor={handleAddColor}
          setIsFormVisible={setIsFormVisible}
        />
      ) : (
        <>
          <div className="w-full mt-4 max-w-md mb-6 flex items-center">
            <div>
              <input
                id="search"
                type="text"
                placeholder="Buscar logos..."
                value={search}
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
            colorList.rows.map((color, index) => {
              return (
                <>
                  <div className="max-w-md w-full rounded overflow-hidden shadow-lg m-4 w-full">
                    <div className="flex-none w-full flex items-center px-6 py-4">
                      <ColorItem
                        key={index}
                        name={color.name}
                        colorsequences={color.colorsequences}
                        photourl={color.photourl}
                      />
                      <ViewButton id={color.id} />
                      <DeleteButton
                        id={color.id}
                        handleDeleteColor={handleDeleteColor}
                      />
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <Spinner />
          )}
          <PaginationControls
            currentPage={page}
            totalPages={Math.ceil(colorList?.count / limit)}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        </>
      )}
    </div>
  );
};
