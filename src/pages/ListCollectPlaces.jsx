import { useContext, useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { Link } from 'react-router-dom';
import { HiMapPin } from 'react-icons/hi2';
import { FaArrowsSpin } from 'react-icons/fa6';
import { MdEditSquare } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { FaMapLocationDot } from 'react-icons/fa6';
import { MdTextsms } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { FaEye } from 'react-icons/fa';

let loggedId = JSON.parse(localStorage.getItem('user_id'));
let isAdmin = JSON.parse(localStorage.getItem('admin'));
function ListCollectPlaces() {
  const { places, deletePlace } = useContext(CollectPlaceContext);
  const { getUserById } = useContext(UsersContext);
  const MapLink = ({ placeId, children }) => (
    <Link to={`/collectPlaces/details/${placeId}`}>{children}</Link>
  );
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
      <div className='page-title align-icon'>
        <HiMapPin /> <span>Locais de coleta</span>
      </div>
      {/* mapa com todos locais */}
      <div className='card-detail'>
        <div className='card-detail-header'>
          <div className='align-icon'>
            <FaArrowsSpin /> <span>Todos Pontos de Coleta</span>
          </div>
          <div className='align-icon'>
            <span>
              <HiMapPin /> Florianópolis
            </span>
          </div>
        </div>
        <div className='card-detail-body'>
          <div className='card-detail-map'>
            <MapContainer
              center={[-27.6626, -48.49987]} // cordenadas iniciais para o mapa
              zoom={10}
              scrollWheelZoom={true}
              style={{ height: '400px', width: '100%' }}
            >
              <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {places.map((place) => (
                <Marker
                  key={place.id}
                  position={[place.latitude, place.longitude]}
                >
                  <Popup>
                    <strong>{place.place}</strong> <br />
                    <br /> {place.placeDescription}
                    <br />
                    <br />
                    <MapLink placeId={place.id}>
                      <FaEye /> <small>detalhes</small>
                    </MapLink>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>

      {places.map((place) => (
        <div className='card-detail' key={place.id}>
          <div className='card-detail-header'>
            <div className='align-icon'>
              <FaArrowsSpin /> <span>{place.collect}</span>
            </div>
            <div className='align-icon'>
              <span>
                <HiMapPin /> {place.neighborhood}
              </span>
            </div>
          </div>
          <div className='card-detail-body'>
            <div className='card-detail-map'>
              <MapContainer
                center={[place.latitude, place.longitude]}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[place.latitude, place.longitude]}>
                  <Popup>
                    {place.place} <br /> {place.placeDescription}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>

            <div className='card-detail-description'>
              <div className='card-detail-subtitle align-icon'>
                <MdTextsms /> <span>ÓI-ÓI-Ó!</span>
              </div>
              {place.place} <br /> {place.placeDescription}
            </div>
            <div className='card-detail-address'>
              <div className='card-detail-subtitle align-icon'>
                <FaMapLocationDot /> <span>Segue reto toda vida</span>
              </div>
              <div className='card-detail-address-text'>
                <div>{`${place.street}, ${place.number} ${place.complement}`}</div>
                <div>{`${place.city} - ${place.state}`}</div>
                <div>{` ${place.neighborhood} - ${place.zipCode}`}</div>
              </div>
            </div>
            <div className='card-detail-footer'>
              <div className='card-detail-user'>
                <div className='card-detail-subtitle align-icon'>
                  <FaUser /> <span>Mó Quiridu</span>
                </div>
                <small>{userNames[place.user_id] || 'Carregando...'}</small>
              </div>
              <div className='card-detail-actions'>
                {(isAdmin || loggedId === place.user_id) && (
                  <>
                    <Link
                      className='primary'
                      to={`/collectPlaces/edit/${place.id}`}
                      title='Editar ponto de coleta'
                    >
                      <MdEditSquare />
                    </Link>
                    <Link
                      className='danger'
                      title='Excluir ponto de coleta'
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
                      <MdDelete />
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ListCollectPlaces;
