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

  async function userLogin(email, password) {
    try {
      // event loop
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      let userFound = false;
      data.map((user) => {
        if (user.email == email) {
          userFound = true;

          if (user.password == password) {
            localStorage.setItem('isLogged', true);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('admin', user.admin);
            window.location.href = '/';
            return;
          }
          alert('Senha inválida');
          return;
        }
      });
      if (!userFound) {
        alert('Usuário não cadastrado');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Erro ao tentar fazer login, verifique sua conexão.');
    }
  }

  function userLogout() {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('user_id');
    localStorage.removeItem('admin');
    window.location.href = '/login';
    return; // Redireciona o usuário para a página de login após o logout
  }

  async function getUserById(id) {
    const response = await fetch(`http://localhost:3000/users/${id}`);
    if (!response.ok) {
      throw new Error('Falha ao buscar usuário');
    }
    return response.json();
  }

  async function updateUser(id, userData) {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error('Falha ao atualizar usuário');
    }
    getUsers(); // Atualiza a lista de usuários após a atualização
  }

  return (
    <UsersContext.Provider
      value={{
        users,
        createUser,
        userLogin,
        userLogout,
        getUserById,
        updateUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
