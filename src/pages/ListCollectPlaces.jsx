import { useContext, useEffect, useState } from 'react';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { Link } from 'react-router-dom';

let loggedId = JSON.parse(localStorage.getItem('user_id'));
let isAdmin = JSON.parse(localStorage.getItem('admin'));
function ListCollectPlaces() {
  const { places } = useContext(CollectPlaceContext);
  const { getUserById } = useContext(UsersContext);

  // esse useState vai armazenar o nome do usuário que registrou o local de coleta
  const [userNames, setUserNames] = useState({});

  // Para pegar o nome do usuário que registrou
  useEffect(() => {
    places.forEach(async (place) => {
      if (place.user_id && !userNames[place.user_id]) {
        try {
          const user = await getUserById(place.user_id);
          setUserNames((prev) => ({ ...prev, [place.user_id]: user.name }));
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }
    });
  }, [places, getUserById, userNames]);

  return (
    <>
      <h3>Locais de Coleta</h3>
      <div>
        {places.map((place) => (
          <div
            key={place.id}
            style={{
              margin: '20px',
              padding: '10px',
              border: '1px solid #ccc',
            }}
          >
            <p>
              <strong>ID:</strong> {place.id}
            </p>
            <p>
              <strong>Local:</strong> {place.place}
            </p>
            <p>
              <strong>Tipo de coleta:</strong> {place.collect}
            </p>
            <p>
              <strong>Descrição:</strong> {place.placeDescription}
            </p>
            <p>
              <strong>Endereço:</strong>{' '}
              {`${place.street}, ${place.number} ${place.complement}, ${place.neighborhood}, ${place.city}, ${place.state}, ${place.zipCode}`}
            </p>
            <p>
              <strong>Cadastrado por:</strong>{' '}
              {userNames[place.user_id] || 'Carregando...'}
            </p>
            <Link to={`/collectPlaces/edit/${place.id}`}>Editar</Link>

            {(isAdmin || loggedId === place.user_id) && (
              <Link to={`/collectPlaces/delete/${place.id}`}>Deletar</Link>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListCollectPlaces;
