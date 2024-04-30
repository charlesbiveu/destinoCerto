import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CreateUsers from '../pages/CreateUsers';
import ListUsers from '../pages/ListUsers';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/users/create',
        element: <CreateUsers />,
      },
      {
        path: '/users/list',
        element: <ListUsers />,
      },
    ],
  },
]);

export default routes;
