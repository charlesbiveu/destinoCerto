import { useContext, useEffect, useState } from 'react';
import { CollectPlaceContext } from '../context/CollectPlaceContext';
import { UsersContext } from '../context/UsersContext';
import { FaArrowsSpin } from 'react-icons/fa6';
import { FaUsers } from 'react-icons/fa6';
import { HiMapPin } from 'react-icons/hi2';
import { FaEye } from 'react-icons/fa';
function Dashboard() {
  const { places, countPlaces } = useContext(CollectPlaceContext);
  const { getUserById } = useContext(UsersContext);
  const { users, countUsers } = useContext(UsersContext);
  const numUsers = countUsers();
  const numPlaces = countPlaces();
  return (
    <>
      <div className='page-title'>Dashboard</div>
      <div className='boxes'>
        <div className='box color-place'>
          <div className='box-icon'>
            <HiMapPin />
          </div>
          <div className='box-number'>{numPlaces}</div>
          <div className='box-title'>Pontos de Coleta</div>
        </div>
        <div className='box color-user'>
          <div className='box-icon'>
            <FaUsers />
          </div>
          <div className='box-number'>{numUsers}</div>
          <div className='box-title'>Mó Quiridus</div>
        </div>
      </div>
      <div className='page-title'>
        <HiMapPin /> Pontos Cadastrados
      </div>
      {places.map((place) => (
        <div className='cards' key={place.id}>
          <div className='card-places-list'>
            <div className='card-places-list-description'>
              <div className='card-places-name'> {place.place}</div>
              <div className='card-places-list-description-collect'>
                <small>Coleta:</small> {place.collect}
              </div>
              <div className='card-places-list-description-neighborhood'>
                {place.neighborhood}
              </div>
            </div>
            <div className='card-link-places-details'>
              <FaEye />
            </div>
          </div>
        </div>
      ))}
      <div className='page-title'>
        <FaUsers /> Mó Quiridus
      </div>
    </>
  );
}

export default Dashboard;
