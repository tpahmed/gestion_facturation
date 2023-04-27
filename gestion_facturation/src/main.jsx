import DevisContext from './contexts/DevisContext';
import FactureContext from './contexts/FactureContext';
import AddContext from './contexts/AddContext';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AddContext>
      <DevisContext>
        <FactureContext>
          <App />
        </FactureContext>
      </DevisContext>
    </AddContext>
  </React.StrictMode>,
)
