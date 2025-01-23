import "core-js/stable"; // Polyfills for stable ES6+ features
import "regenerator-runtime/runtime"; // Polyfills for async/await
import "dom4"; // Polyfill for modern DOM methods like `prepend`
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TodoProvider from './TodoContext';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

ReactDOM.createRoot(document.getElementById('root')).render(
  <TodoProvider>
    <App />
  </TodoProvider>,
)
