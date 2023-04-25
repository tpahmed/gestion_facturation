import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import './App.css'
import Ajouter from './Ajouter';
import AddContainer from './components/AddContainer';
import AddContext from './contexts/AddContext';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AddContext>
            <AddContainer/>
            <NavBar/>
            <Container>
              <Routes>
                <Route path='/' element={<Navigate to={"/devis"}/>}/>
                <Route index path='/devis' element={<></>}/>
                <Route path='/facture' element={<Container/>}/>
                <Route path='/ajouter' element={<Ajouter/>}/>
                <Route path='*' element={<Navigate to={"/devis"}/>}/>
              </Routes>
            </Container>
        </AddContext>
      </BrowserRouter>
    </div>
  )
}

export default App
