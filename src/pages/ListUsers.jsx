import { useContext } from 'react';
import { UsersContext } from '../context/UsersContext';
function ListUsers() {
  const { users, ListUsers } = useContext(UsersContext);
  return (
    <>
      <h3>Users</h3>
      {!!users && users.map((user) => <p key={user.id}>{user.name}</p>)}
    </>
  );
}

export default ListUsers;
