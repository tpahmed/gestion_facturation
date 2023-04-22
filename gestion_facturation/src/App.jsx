import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Navigate to={"/devis"}/>}/>
          <Route index path='/devis' element={<></>}/>
          <Route path='/facture' element={<></>}/>
          <Route path='/ajouter' element={<></>}/>
          <Route path='*' element={<Navigate to={"/devis"}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
