import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext';
import logo from '../../assets/destinoCerto.png';

function Header() {
  const { userLogout } = useContext(UsersContext);

  return (
    <header>
      <div className='header-container'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} className='logo' alt='Destino certo' />{' '}
          </Link>
        </div>
        <div className='nav-container'>
          <nav>
            <ul className='nav-links'>
              <li className='dropdown'>
                Usuários
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/users/list'>Listar</Link>
                  </li>
                  <li>
                    <Link to='/users/create'>Cadastrar</Link>
                  </li>
                </ul>
              </li>
              <li className='dropdown'>
                Locais de Coleta
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/collectPlaces/create'>Cadastrar</Link>
                  </li>
                  <li>
                    <Link to='/collectPlaces/list'>Listar</Link>
                  </li>
                </ul>
              </li>
              <li className='dropdown'>
                Perfil
                <ul className='dropdown-content'>
                  <li>
                    <Link to='/profile'>Meu Perfil</Link>
                  </li>
                  <li>
                    <Link to='/my-places'>Meus Locais</Link>
                  </li>
                  <li>
                    <Link
                      to='#'
                      onClick={(e) => {
                        e.preventDefault();
                        userLogout();
                      }}
                    >
                      Sair
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
