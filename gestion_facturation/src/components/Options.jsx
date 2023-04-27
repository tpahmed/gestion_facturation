import { useEffect, useState, useContext } from 'react';
import { Add_Context } from '../contexts/AddContext';
import Ajouter_Active from '../assets/ajouter-active.svg';
import Supprimer from '../assets/Supprimer.svg';
import axios from 'axios';
import Polygon from '../assets/Polygon.svg';
import './Options.css'

export default function Options({Enregistre,EnregistreTelechager}) {
    const [Societe,SetSociete] = useState([]);
    const [Client,SetClient] = useState([]);
    const {Page,SetPage,Commands,SetCommands,Type,SetType,SelectedCommand,SetSelectedCommand,SocieteSelected,SetSocieteSelected,ClientSelected,SetClientSelected} = useContext(Add_Context);
    const changeType = ()=>SetType(!Type);
    const supprimerCommand = ()=>{
        SetCommands(Commands.filter((e)=>e.reference !== SelectedCommand));
        SetSelectedCommand('');
    }

    useEffect(()=>{
        axios.get('//localhost:4444/api/societes').then((res)=>SetSociete(res.data.data))
        axios.get('//localhost:4444/api/clients').then((res)=>SetClient(res.data.data))
    },[Page]);

  return (
    <div className="Options">
    
        <div className="Options-DropDown">
            <select className='Options-Select' value={SocieteSelected} onChange={(e)=>SetSocieteSelected(e.target.value)}>
                <option key={'x'} defaultChecked disabled value="">
                    Societe
                </option>
                {
                    Societe.map((e)=><option key={e.id} value={e.id}>{e.raison_s}</option>)
                }
            </select>
            <div className='Options-Operation' onClick={()=>SetPage('Societe')}>
                <img src={Ajouter_Active} alt='Ajouter Societe' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
            </div>
        </div>
        <div className="Options-DropDown">
            <select className='Options-Select' value={ClientSelected} onChange={(e)=>SetClientSelected(e.target.value)}>
                <option defaultChecked disabled value="">
                    Client
                </option>
                {
                    Client.map((e)=><option key={e.id} value={e.id}>{e.raison_s}</option>)
                }
            </select>
            <div className='Options-Operation' onClick={()=>SetPage('Client')}>
                <img src={Ajouter_Active} alt='Ajouter Client' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
            </div>
        </div>

        <hr className='Options-Separator'/>

        <div className="Options-Type">
            <div className="Options-Type-Option" style={{ color : Type ? "var(--Gold)" : null}} onClick={()=>SetType(true)} >
                Devis
            </div>
            <div className='Options-Type-Switch' onClick={changeType} style={ Type ? null : { "backgroundColor":"var(--Gold)", "borderColor" : "var(--Dark-Blue)"}}>
                <div className='Options-Type-Switch-Cyrcle' style={ Type ? null : { "marginLeft" : "4.15em" , "backgroundColor":"var(--Dark-Blue)"}}>
                    <img src={Polygon} alt='switch' width={'20em'} style={ !Type ? { left: "47%" , transform : "translateX(-50%) translateY(-50%)  rotate(180deg)", filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)"} : null}/>
                </div>
            </div>
            <div className="Options-Type-Option" style={{ color : !Type ? "var(--Gold)" : null}} onClick={()=>SetType(false)} >
                Facture
            </div>
        </div>

        <hr className='Options-Separator'/>
            
        <div className="Options-Commands">
            <div className="Options-Commands-Header">
                <span className='Options-Commands-Title'>
                    Commands :
                </span>
                <div className="Options-Commands-Operations">
                    <div className='Options-Operation' onClick={supprimerCommand}>
                        <img src={Supprimer} alt='Ajouter Client' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
                    </div>
                    <div className='Options-Operation'  onClick={()=>SetPage('Command')}>
                        <img src={Ajouter_Active} alt='Ajouter Client' width={'20em'} style={{ filter:"invert(65%) sepia(86%) saturate(0%) hue-rotate(225deg) brightness(97%) contrast(94%)" }}/>
                    </div>
                </div>
            </div>
            <div className='Options-Commands-List'>
                <table className='Options-Commands-table'>
                    <thead>
                        <tr>
                            <th>Ref</th>
                            <th>Titre</th>
                            <th>Prix Unit</th>
                            <th>Qtt.</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Commands.map((e)=>
                        <tr key={e.reference} onClick={()=>SetSelectedCommand(e.reference)} className={SelectedCommand === e.reference ? 'Options-Commands-Selected' : null}>
                            <td>{e.reference}</td>
                            <td id='Options-Commands-table-titre'>{e.titre}</td>
                            <td>{e.prix}</td>
                            <td>{e.quantite}</td>
                        </tr>
                    )                        
                    }

                    </tbody>
                </table>
            </div>
            <div className="Options-Enregistre">
                <input type="button" value={"Enregistre"} onClick={Enregistre}/>
                <input type="button" value={"Enregistre et Telecharger PDF"} onClick={EnregistreTelechager}/>
            </div>
        </div>
    </div>
  )
}
