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

  //para contar o numero de usuários
  const countUsers = () => {
    return users.length;
  };

  function createUser(user) {
    if (!user.name || user.name.trim() === '') {
      alert('Preencha o nome completo');
      return;
    }
    if (!user.cpf || user.cpf.trim() === '') {
      alert('Preencha o CPF');
      return;
    }
    // valida o cpf
    if (!user.cpf || user.cpf.trim() === '') {
      alert('Preencha o CPF');
      return;
    }
    if (!isCPFValid(user.cpf)) {
      alert('CPF inválido');
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
        window.location.href = '/';
        return;
      })
      .catch(() => alert('Erro ao criar o usuário'));
  }

  //valida o cpf
  function isCPFValid(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0,
      remainder;
    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
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
          alert('Tás Tolo! Tás? A senha é outra!');
          return;
        }
      });
      if (!userFound) {
        alert('Esse Quiridu não está cadastrado!');
      }
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      alert('Sua internet mofou cas pombas na balaia');
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

  function deleteUser(id) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        alert('Usuário deletado com sucesso!');
        getUsers(); // Atualiza a lista após a exclusão
      })
      .catch(() => alert('Erro ao deletar usuário'));
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
        countUsers,
        deleteUser,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
