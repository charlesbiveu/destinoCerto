import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UsersContext } from '../context/UsersContext';
import logo from '../assets/destinoCerto.png';
function Login() {
  const { userLogin } = useContext(UsersContext);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  async function makeLogin() {
    await userLogin(user.email, user.password);
  }

  return (
    <>
      <img src={logo} className='logo' alt='Destino certo' />
      <form>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          value={user.email}
          onChange={(event) => setUser({ ...user, email: event.target.value })}
          id='email'
        />
        <label htmlFor='password'>Senha</label>
        <input
          type='password'
          value={user.password}
          onChange={(event) =>
            setUser({ ...user, password: event.target.value })
          }
          id='password'
        />
        <button onClick={() => makeLogin()}>Entrar</button>
      </form>
      <div>
        Não possui uma conta? <Link to='/users/create'>Cadastrar</Link>
      </div>
    </>
  );
}

export default Login;
