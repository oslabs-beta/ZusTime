import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from '../client/components/App';
import Tree from './components/Tree/Tree';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(<App />);

// const router = createBrowserRouter([
//     { path: '/', element: <App /> },
//     { path: '/Tree', element: <Tree /> },
//   ]);

//   createRoot(document.getElementById('root')).render(<RouterProvider router={router}><App/></RouterProvider>);
