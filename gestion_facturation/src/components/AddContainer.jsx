import { useState,useContext } from 'react';
import { Add_Context } from '../contexts/AddContext';
import Ajouter_Active from '../assets/ajouter-active.svg';
import './AddContainer.css'
import axios from 'axios';

export default function AddContainer() {
  const ValeurParDefault = {'Societe':{"raison_s":"","contact":"","tel":"","patente":"","ICE":"","RC":""}}
  const [Societe,SetSociete] = useState(ValeurParDefault.Societe)
  const {Page,SetPage} = useContext(Add_Context);
  const Pages = ["Societe","Client","Command"]
  const Enregistre = ()=>{
    switch(Page){
      case "Societe":
        axios.post("//localhost:4444/api/societes",Societe).then((e)=>{
          if (e.data.status === "reussis"){
            SetSociete(ValeurParDefault.Societe);
            SetPage('');
            return;
          }
          alert(e.data.message);
        });
        return;

    }
  }

  return (
    <div className={`AddContainer ${Pages.includes(Page) ? "AddContainer-visible" : ""}`}>
        <div className='AddContainer-Societe' style={Page === Pages[0] ? {"left":"50%"} : null}>
          <div className="AddContainer-Header">
            <span className='AddContainer-Title'>Ajouter une Societe :</span>
            <img src={Ajouter_Active} alt='Quitter' onClick={()=>SetPage('')} style={{ width:"1.5em",rotate:"45deg",cursor:"pointer" }}/>
          </div>
          <div className="AddContainer-inputs">
            <table className='AddContainer-inputs-table'>
              <tbody>
                <tr>
                  <td>
                    <div className='AddContainer-inputs-Label'>Raison Social : </div>
                    <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.raison_s} onChange={(e)=>SetSociete({...Societe,"raison_s":e.target.value.toUpperCase()})}/>
                  </td>
                  <td>
                    <div className='AddContainer-inputs-Label'>Patente : </div>
                    <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.patente} onChange={(e)=>SetSociete({...Societe,"patente":e.target.value.toUpperCase()})}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='AddContainer-inputs-Label'>N° Telephone : </div>
                    <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.tel} onChange={(e)=>isNaN(e.target.value) ? '' : SetSociete({...Societe,"tel":e.target.value})}/>
                  </td>
                  <td>
                    <div className='AddContainer-inputs-Label'>ICE : </div>
                    <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.ICE} onChange={(e)=>SetSociete({...Societe,"ICE":e.target.value.toUpperCase()})}/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className='AddContainer-inputs-Label'>RC : </div>
                    <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.RC} onChange={(e)=>SetSociete({...Societe,"RC":e.target.value.toUpperCase()})}/>
                  </td>
                  <td>
                    <div className='AddContainer-inputs-Label'>Contact : </div>
                    <textarea className='AddContainer-inputs-input' type='text' spellCheck='false' value={Societe.contact} onChange={(e)=>SetSociete({...Societe,"contact":e.target.value})}>

                    </textarea>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
          <input type="button" onClick={Enregistre} value="Enregistre" id='AddContainer-inputs-Enregistre' className='AddContainer-inputs-input' />
        </div>
    </div>
  )
}
