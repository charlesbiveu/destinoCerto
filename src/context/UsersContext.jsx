import { createContext, useEffect, useState } from 'react';
export const UsersContext = createContext();

export const UsersContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch('http://localhost:3000/users')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error));
  }

  function createUser(user) {
    if (!user.name || user.name.trim() === '') {
      alert('Preencha o nome completo');
      return;
    }
    if (!user.cpf || user.cpf.trim() === '') {
      alert('Preencha o CPF');
      return;
    }
    // valida se já existe o cpf
    const existingUser = users.find((u) => u.cpf === user.cpf);
    if (existingUser) {
      alert('Já existe um usuário cadastrado com este CPF');
      return;
    }
    // validar o email tb já que é usado para login
    const existingEmail = users.find((m) => m.email === user.email);
    if (existingEmail) {
      alert('Já existe um usuário cadastrado com este E-mail');
      return;
    }

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(() => {
        alert('Usuário criado com sucesso');
        getUsers();
      })
      .catch(() => alert('Erro ao criar o usuário'));
  }

  return (
    <UsersContext.Provider value={{ users, createUser }}>
      {children}
    </UsersContext.Provider>
  );
};
