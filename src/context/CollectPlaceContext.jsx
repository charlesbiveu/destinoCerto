import { createContext, useState, useEffect } from 'react';

export const CollectPlaceContext = createContext();

export const CollectPlaceContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getPlaces();
  }, []);
  function getPlaces() {
    fetch('http://localhost:3000/collectPlaces')
      .then((response) => response.json())
      .then((data) => setPlaces(data))
      .catch((error) => console.log(error));
  }

  function createPlace(place) {
    fetch('http://localhost:3000/collectPlaces', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(place),
    })
      .then(() => {
        alert('Local de coleta criado com seucesso!');
      })
      .catch(() => alert('Erro ao criar o local de coleta'));
  }

  async function getCollectPlaceById(id) {
    const response = await fetch(`http://localhost:3000/collectPlaces/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar local de coleta');
    }
    return response.json();
  }

  async function updatePlace(id, placeData) {
    const response = await fetch(`http://localhost:3000/collectPlaces/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(placeData),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar local de coleta');
    }
    getPlaces();
  }

  return (
    <CollectPlaceContext.Provider
      value={{ places, createPlace, getCollectPlaceById, updatePlace }}
    >
      {children}
    </CollectPlaceContext.Provider>
  );
};
