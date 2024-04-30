import { Navigate, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateUsers from '../pages/CreateUsers';
import ListUsers from '../pages/ListUsers';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';

let isLogged = JSON.parse(localStorage.getItem('isLogged')) || false;
const PrivateRoute = ({ children }) => {
  return isLogged ? children : <Navigate to='/login' />;
};

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/users/create',
    element: <CreateUsers />,
  },
  {
    path: '/',
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: '/',
        element: <Dashboard />,
      },
      {
        path: '/users/list',
        element: <ListUsers />,
      },
    ],
  },
]);

export default routes;
