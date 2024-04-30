import { Link } from 'react-router-dom';
function Header() {
  return (
    <>
      <h1>Destino Certo</h1>
      <div>
        Users:
        <Link to='/users/list'>Listar</Link>
        <Link to='/users/create'>Cadastrar</Link>
      </div>
    </>
  );
}
export default Header;
