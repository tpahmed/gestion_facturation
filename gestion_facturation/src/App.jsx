import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import './App.css'
import { Add_Context } from './contexts/AddContext';
import AddContainer from './components/AddContainer';
import { useContext } from 'react';
import Ajouter from './Ajouter';
import Devis from './Devis';
import Facture from './Facture';

function App() {
  const {KEY} = useContext(Add_Context);
  return (
    <div className="App">
      <BrowserRouter>
            <AddContainer/>
            <NavBar/>
            <Container>
              <Routes>
                <Route path='/' element={<Navigate to={"/devis"}/>}/>
                <Route index path='/devis' element={<Devis/>}/>
                <Route path='/facture' element={<Facture/>}/>
                <Route path='/ajouter' element={<Ajouter/>}/>
                <Route path='*' element={<Navigate to={"/devis"}/>}/>
              </Routes>
            </Container>
      </BrowserRouter>
    </div>
  )
}

export default App
