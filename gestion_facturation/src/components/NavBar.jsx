import './NavBar.css';
import Ajouter from '../assets/ajouter.svg';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const [path,setpath] = useState('/');
  const location = useLocation();
  const navigator = useNavigate();
  useEffect(()=>{
    setpath(location.pathname)
  },[location.pathname])
  return (
    <div className='NavBar'>
        <div className='NavBar-Options' style={{ color : path === '/devis' ? 'var(--Gold)' : null }} onClick={()=>navigator('/devis')}>
          Devis
        </div>
        <div className='NavBar-Options' style={{ color : path === '/facture' ? 'var(--Gold)' : null }} onClick={()=>navigator('/facture')}>
          Facture
        </div>
        <div className='NavBar-Options' id='NavBar-Add' onClick={()=>navigator('/ajouter')}>
          <img id='NavBar-AddImg' key={path} src={Ajouter} style={{ filter: path === '/ajouter' ? "invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" : null }} alt='Ajouter'/>
        </div>
    </div>
  )
}
