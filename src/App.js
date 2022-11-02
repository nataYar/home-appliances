import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, Blog, Login,  TestimonialsPage, Refrigerator, Oven, Washer, Dryer, Cooktop, Freezer } from './pages/importsPages';
import { Navbar } from './components/importsComponents';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home/>,
    }, {
      path: '/blog',
      element: <Blog/>,
    }, {
      path: '/testimonials',
      element: <TestimonialsPage/>,
    }, {
      path: '/unapproved-testimonials',
      element: <TestimonialsPage/>,
    }, {
      path: '/refrigerator',
      element:<Refrigerator/>,
    }, {
      path: '/dryer',
      element:<Dryer/>,
    }, {
      path: '/freezer',
      element:<Freezer/>,
    },  {
      path: '/oven',
      element:<Oven/>,
    }, {
      path: '/washer',
      element:<Washer/>,
    }, {
      path: '/cooktop',
      element:<Cooktop/>,
    }, {
      path: '/admin',
      element: <Login/>,
    }
  ];

  const routeComponents = routes.map(({path, element}, key) => 
    <Route exact path={path} element={element} key={key} />);
  return (
    <>
      <Navbar/>
      <div className='app'>
        <Routes>
          {routeComponents} 
        </Routes>
      </div>
    </>
  );
}

export default App;
