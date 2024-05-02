import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../../context/UsersContext'; // Ajuste o caminho conforme necessário

function Header() {
  const { userLogout } = useContext(UsersContext);

  return (
    <>
      <h1>Destino Certo</h1>
      <div>
        Users:
        <Link to='/users/list'>Listar</Link>
        <Link to='/users/create'>Cadastrar</Link>
        <br />
        <Link
          to='#'
          onClick={(e) => {
            e.preventDefault();
            userLogout();
          }}
        >
          Logout
        </Link>
        <br />
        Locais de Coleta:
        <Link to='/collectPlaces/create'>Cadastrar</Link>
        <Link to='/collectPlaces/list'>Listar</Link>
      </div>
    </>
  );
}

export default Header;
