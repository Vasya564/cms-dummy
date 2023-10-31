import { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Link, Outlet, Navigate, createHashRouter } from 'react-router-dom';
import tabsData from './tabs.json';
import './App.css';

const Tab = ({ path }) => {
  const TabComponent = lazy(() => import(`./tabs/${path}.jsx`));

  return (
      <Suspense fallback={<div>Loading...</div>}>
          <TabComponent />
      </Suspense>
  );
}

const TabRoutes = () => {
  return (
    <main>
      <nav>
      <ul className='nav-list'>
        {tabsData.map((tab) => (
          <li key={tab.id}>
            <Link className='nav-list--link' to={`/${tab.id}`}>{tab.title}</Link>
          </li>
        ))}
      </ul>
      </nav>
      <Outlet />
    </main>
  );
}

const tabRoutes = tabsData.map((tab) => (
  {
    path: tab.id,
    element: <Tab path={tab.path} />,
  }
));

const router = createHashRouter([
  {
    path: "/",
    element: <TabRoutes />,
    children: [
      {
        path: "",
        element: <Navigate to={tabsData[0].path}/>,
        default: true,
      },
      ...tabRoutes,
    ],
  },
]);

function App() {

  return (
    <RouterProvider router={router}/>
  );
}

export default App
