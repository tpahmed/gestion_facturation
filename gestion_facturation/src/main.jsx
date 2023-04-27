import DevisContext from './contexts/DevisContext';
import AddContext from './contexts/AddContext';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddContext>
      <DevisContext>
        <App />
      </DevisContext>
    </AddContext>
  </React.StrictMode>,
)
