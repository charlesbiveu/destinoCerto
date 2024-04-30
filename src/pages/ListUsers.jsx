import { useContext } from 'react';
import { UsersContext } from '../context/UsersContext';

function ListUsers() {
  const { users, deleteUser, editUser } = useContext(UsersContext);

  return (
    <>
      <h3>Users</h3>
      <div>
        {users &&
          Array.isArray(users) &&
          users.map((user) => (
            <div
              key={user.id}
              style={{
                margin: '20px',
                padding: '10px',
                border: '1px solid #ccc',
              }}
            >
              <p>
                <strong>ID:</strong> {user.id}
              </p>
              <p>
                <strong>Nome:</strong> {user.name}
              </p>
              <p>
                <strong>Sexo:</strong> {user.gender}
              </p>
              <p>
                <strong>CPF:</strong> {user.cpf}
              </p>
              <p>
                <strong>Data nascimento:</strong> {user.birthDate}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Endereço:</strong>{' '}
                {`${user.street}, ${user.number} ${user.complement}, ${user.neighborhood}, ${user.city}, ${user.state}, ${user.zipCode}`}
              </p>
              <p>
                <strong>Administrador:</strong> {user.admin ? 'Sim' : 'Não'}
              </p>
              <button onClick={() => editUser(user.id)}>Editar</button>
              <button
                onClick={() => deleteUser(user.id)}
                style={{ marginLeft: '10px' }}
              >
                Deletar
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default ListUsers;
