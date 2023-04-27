import { useContext, useState,useEffect } from 'react';
import TelechargerIcon from '../assets/download.svg';
import FacturerIcon from '../assets/Facture.svg';
import Yes from '../assets/YES.svg';
import No from '../assets/NO.svg';
import { Devis_Context } from '../contexts/DevisContext';
import axios from 'axios';
import './ListeDevis.css';


export default function ListeDevis({TelechargerPdf, Factrurer}) {
    const {SocieteSelected,SetSocieteSelected,DevisSelected,SetDevisSelected,UpdateDevisFacture} = useContext(Devis_Context);
    const [Societe,SetSociete] = useState([]);
    const [Devis,SetDevis] = useState([]);
    const [DevisFacture,SetDevisFacture] = useState([]);
    
    useEffect(()=>{
        axios.get('//localhost:4444/api/societes').then((res)=>res.data.data ? SetSociete(res.data.data) : '')
        axios.get('//localhost:4444/api/devisfacture').then((res)=>res.data.data ? SetDevisFacture(res.data.data.map(e=>e.id_devis)) : '')
        
        if(SocieteSelected){
            axios.get('//localhost:4444/api/devis/s/'+SocieteSelected).then((res)=>res.data.data ? SetDevis(res.data.data) : '');
        }
    },[SocieteSelected,UpdateDevisFacture]);
  return (
    <div className="ListeDevis">
        <div className="ListeDevis-DropDown">
            <select className='ListeDevis-Select' value={SocieteSelected} onChange={(e)=>SetSocieteSelected(e.target.value)}>
                <option key={'x'} defaultChecked disabled value="">
                    Societe
                </option>
                {
                    Societe.map((e)=><option key={e.id} value={e.id}>{e.raison_s}</option>)
                }
            </select>
            <div className='ListeDevis-Operation' onClick={Factrurer}>
                <img src={FacturerIcon} alt='Facture le devis' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
            </div>
            <div className='ListeDevis-Operation' onClick={TelechargerPdf}>
                <img src={TelechargerIcon} alt='Telecharger' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
            </div>
        </div>
        <div className='ListeDevis-Commands-List'>
                <table className='ListeDevis-Commands-table'>
                    <thead>
                        <tr>
                            <th>Num Devis</th>
                            <th>Num Client</th>
                            <th>Date Devis</th>
                            <th>Facture</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Devis.map((e)=>
                            <tr key={e.N_devis} onClick={()=>SetDevisSelected(e.N_devis)} className={DevisSelected === e.N_devis ? 'ListeDevis-Commands-Selected' : null}>
                                <td>{e.N_devis}</td>
                                <td>{e.id_client}</td>
                                <td>{e.date_devis.slice(0, 10)}</td>
                                <td><img src={DevisFacture.includes(e.N_devis) ? Yes : No} alt={DevisFacture.includes(e.N_devis) ? 'Oui' : 'Non'} style={{ width:'4em',filter:'invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)' }} /></td>
                            </tr>
                        )                        
                    }

                    </tbody>
                </table>
            </div>
    </div>
  )
}
