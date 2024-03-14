import React from 'react';
import ReactDOM from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../src/index.css';

import Main from './components/Main';

const dom = document.getElementById("root");
if (dom !== null) {
  const root = ReactDOM.createRoot(dom);
  root.render(<Main />);
}