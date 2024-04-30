import Header from './components/Header';
import { UsersContextProvider } from './context/UsersContext.jsx';
import './App.css';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <UsersContextProvider>
      <Header />
      <Outlet />
    </UsersContextProvider>
  );
}

export default App;
