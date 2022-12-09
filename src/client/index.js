import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { render } from 'react-dom';
import App from '../client/components/App';

createRoot(document.getElementById('root')).render(<App />);
