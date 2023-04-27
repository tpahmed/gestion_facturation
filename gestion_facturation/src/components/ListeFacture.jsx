import { Facture_Context } from '../contexts/FactureContext';
import { useContext, useState,useEffect } from 'react';
import TelechargerIcon from '../assets/download.svg';
import './ListeFacture.css';
import axios from 'axios';


export default function ListeFacture({TelechargerPdf}) {
    const {SocieteSelected,SetSocieteSelected,FactureSelected,SetFactureSelected} = useContext(Facture_Context);
    const [Societe,SetSociete] = useState([]);
    const [Factures,SetFactures] = useState([]);
    useEffect(()=>{
        axios.get('//localhost:4444/api/societes').then((res)=>res.data.data ? SetSociete(res.data.data) : '')
        if(SocieteSelected){
            axios.get('//localhost:4444/api/Factures/s/'+SocieteSelected).then((res)=>res.data.data ? SetFactures(res.data.data) : '');
            
        }
    },[SocieteSelected]);
  return (
    <div className="ListeFacture">
        <div className="ListeFacture-DropDown">
            <select className='ListeFacture-Select' value={SocieteSelected} onChange={(e)=>SetSocieteSelected(e.target.value)}>
                <option key={'x'} defaultChecked disabled value="">
                    Societe
                </option>
                {
                    Societe.map((e)=><option key={e.id} value={e.id}>{e.raison_s}</option>)
                }
            </select>
            <div className='ListeFacture-Operation' onClick={TelechargerPdf}>
                <img src={TelechargerIcon} alt='Telecharger' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
            </div>
        </div>
        <div className='ListeFacture-Commands-List'>
                <table className='ListeFacture-Commands-table'>
                    <thead>
                        <tr>
                            <th>Num Facture</th>
                            <th>Num Client</th>
                            <th>Date Facture</th>
                            <th>Date Echeance</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Factures.map((e)=>
                        <tr key={e.N_facture} onClick={()=>SetFactureSelected(e.N_facture)} className={FactureSelected === e.N_facture ? 'ListeFacture-Commands-Selected' : null}>
                            <td>{e.N_facture}</td>
                            <td>{e.id_client}</td>
                            <td>{e.date_facture.slice(0, 10)}</td>
                            <td>{e.date_echeance.slice(0, 10)}</td>
                        </tr>
                    )                        
                    }

                    </tbody>
                </table>
            </div>
    </div>
  )
}
