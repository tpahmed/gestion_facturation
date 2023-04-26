import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from './components/Container';
import NavBar from './components/NavBar';
import './App.css'
import Ajouter from './Ajouter';
import AddContainer from './components/AddContainer';
import AddContext from './contexts/AddContext';
import ViewPort from './components/ViewPort';

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
                <Route path='/view' element={<ViewPort element={{ societe:{raison_s:"hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",contact:'dsfdfsdsfds',patente:'1555151',tel:'62266226',ICE:"fssdfdsfds",RC:"sqdqsdsqd"}, client:{id:15,raison_s:"byeee",adresse:'av tetouane, tanger',ICE:"fsdfsfs",LE:"s515sdf5s"},facture:{	N_facture:1,date_facture:'2015-1-12',date_echeance:'2015-1-12'}, commands:[], prixTotale:100000 }}/>}/>
                <Route path='*' element={<Navigate to={"/devis"}/>}/>
              </Routes>
            </Container>
        </AddContext>
      </BrowserRouter>
    </div>
  )
}

export default App
