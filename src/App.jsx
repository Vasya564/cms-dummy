import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, Link, Outlet, Navigate } from 'react-router-dom';
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

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TabRoutes />}>
          <Route path='/' element={<Navigate to={tabsData[0].path}/>} />
          {tabsData.map((tab) => (
            <Route key={tab.id} path={tab.id} element={<Tab path={tab.path} />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
