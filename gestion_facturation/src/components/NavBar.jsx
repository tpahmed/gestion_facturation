import './NavBar.css';
import Ajouter from '../assets/ajouter.svg';
import Ajouter_Active from '../assets/ajouter-active.svg';

export default function NavBar() {
  return (
    <div className='NavBar'>
        <div className='NavBar-Options'>Devis</div>
        <div className='NavBar-Options'>Facture</div>
        <div className='NavBar-Options'></div>
    </div>
  )
}
