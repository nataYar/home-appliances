import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home, BlogPage, Brands, Login, TestimonialsPage, Refrigerator, Oven, Washer, Dryer, Cooktop, Freezer } from './pages/importsPages';
import { Navbar } from './components/importsComponents';

function App() {
  const routes = [
    {
      path: '/',
      element: <Home/>,
    }, {
      path: '/blog',
      element: <BlogPage/>,
    }, {
      path: '/testimonials',
      element: <TestimonialsPage/>,
    }, {
      path: '/brands',
      element: <Brands/>,
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
    }
  ];

  const routeComponents = routes.map(({path, element}, key) => 
    <Route exact path={path} element={element} key={key} />);
  return (
    <>
      <div className='app'>
        <Routes>
          {routeComponents} 
        </Routes>
      </div>
    </>
  );
}

export default App;
