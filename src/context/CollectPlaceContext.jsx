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

  return (
    <CollectPlaceContext.Provider value={{ places, setPlaces }}>
      {children}
    </CollectPlaceContext.Provider>
  );
};
