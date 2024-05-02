import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
let loggedId = JSON.parse(localStorage.getItem('user_id'));
let isAdmin = JSON.parse(localStorage.getItem('admin'));
function ListCollectPlacesByUser() {
  const { user_id } = useParams();
  const { getCollectPlacesByUserId, deletePlace } =
    useContext(CollectPlaceContext);
  const [userPlaces, setUserPlaces] = useState([]);
  const { getUserById } = useContext(UsersContext);

  useEffect(() => {
    getCollectPlacesByUserId(user_id)
      .then(setUserPlaces)
      .catch((error) => {
        console.error('Erro ao buscar locais de coleta:', error);
        alert('Falha ao buscar locais de coleta.');
      });
  }, [user_id, getCollectPlacesByUserId]);

  const [userNames, setUserNames] = useState({});

  // Para pegar o nome do usuário que registrou
  useEffect(() => {
    userPlaces.forEach(async (place) => {
      if (place.user_id && !userNames[place.user_id]) {
        try {
          const user = await getUserById(place.user_id);
          setUserNames((prev) => ({ ...prev, [place.user_id]: user.name }));
        } catch (error) {
          console.error('Erro ao buscar dados do usuário', error);
        }
      }
    });
  }, [userPlaces, getUserById, userNames]);

  return (
    <>
      <h3>Locais de Coleta</h3>
      <div>
        {userPlaces.map((place) => (
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
            {(isAdmin || loggedId === place.user_id) && (
              <Link to={`/collectPlaces/edit/${place.id}`}>Editar</Link>
            )}
            {(isAdmin || loggedId === place.user_id) && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Tem certeza que deseja deletar este local de coleta?'
                    )
                  ) {
                    deletePlace(place.id);
                  }
                }}
              >
                Deletar
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default ListCollectPlacesByUser;
