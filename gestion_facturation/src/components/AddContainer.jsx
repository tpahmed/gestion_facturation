import { useState,useContext } from 'react';
import { Add_Context } from '../contexts/AddContext';
import Ajouter_Active from '../assets/ajouter-active.svg';
import './AddContainer.css'
import axios from 'axios';

export default function AddContainer() {
  const ValeurParDefault = {
    'Societe':
            {"raison_s":"","contact":"","tel":"","patente":"","ICE":"","RC":""},
    'Client':
            {"raison_s":"","adresse":"","ICE":"","tel":"","LE":""},
    'Command':
            {"reference":"","titre":"","prix":"","quantite":""}
  };
  const [Societe,SetSociete] = useState(ValeurParDefault.Societe)
  const [Client,SetClient] = useState(ValeurParDefault.Client)
  const [Command,SetCommand] = useState(ValeurParDefault.Command)
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
      case "Client":
        axios.post("//localhost:4444/api/clients",Client).then((e)=>{
          if (e.data.status === "reussis"){
            SetClient(ValeurParDefault.Client);
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
    {
      Page ===  Pages[0] ? 
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
          : Page ===  Pages[1] ? 
          <div className='AddContainer-Client' style={Page === Pages[1] ? {"left":"50%"} : null}>
            <div className="AddContainer-Header">
              <span className='AddContainer-Title'>Ajouter un Client :</span>
              <img src={Ajouter_Active} alt='Quitter' onClick={()=>SetPage('')} style={{ width:"1.5em",rotate:"45deg",cursor:"pointer" }}/>
            </div>
            <div className="AddContainer-inputs">
              <table className='AddContainer-inputs-table'>
                <tbody>
                  <tr>
                    <td>
                      <div className='AddContainer-inputs-Label'>Raison Social : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Client.raison_s} onChange={(e)=>SetClient({...Client,"raison_s":e.target.value.toUpperCase()})}/>
                    </td>
                    <td>
                      <div className='AddContainer-inputs-Label'>Adresse : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Client.adresse} onChange={(e)=>SetClient({...Client,"adresse":e.target.value.toUpperCase()})}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='AddContainer-inputs-Label'>N° Telephone : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Client.tel} onChange={(e)=>isNaN(e.target.value) ? '' : SetClient({...Client,"tel":e.target.value})}/>
                    </td>
                    <td>
                      <div className='AddContainer-inputs-Label'>ICE : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Client.ICE} onChange={(e)=>SetClient({...Client,"ICE":e.target.value.toUpperCase()})}/>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className='AddContainer-inputs-Label'>PE : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Client.PE} onChange={(e)=>SetClient({...Client,"PE":e.target.value.toUpperCase()})}/>
                    </td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
            <input type="button" onClick={Enregistre} value="Enregistre" id='AddContainer-inputs-Enregistre' className='AddContainer-inputs-input' />
          </div>
          : Page ===  Pages[2] ?
          <div className='AddContainer-Command' style={Page === Pages[2] ? {"left":"50%"} : null}>
            <div className="AddContainer-Header">
              <span className='AddContainer-Title'>Ajouter un Client :</span>
              <img src={Ajouter_Active} alt='Quitter' onClick={()=>SetPage('')} style={{ width:"1.5em",rotate:"45deg",cursor:"pointer" }}/>
            </div>
            <div className="AddContainer-inputs">
              <table className='AddContainer-inputs-table'>
                <tbody>
                  <tr>
                    <td>
                      <div className='AddContainer-inputs-Label'>Reference : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Command.reference} onChange={(e)=>SetCommand({...Command,"reference":e.target.value.toUpperCase()})}/>
                    </td>
                    <td>
                      <div className='AddContainer-inputs-Label'>Adresse : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Command.titre} onChange={(e)=>SetCommand({...Command,"titre":e.target.value.toUpperCase()})}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className='AddContainer-inputs-Label'>Prix Unitaire : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Command.prix} onChange={(e)=>isNaN(e.target.value) ? '' : SetCommand({...Command,"prix":e.target.value})}/>
                    </td>
                    <td>
                      <div className='AddContainer-inputs-Label'>Quantite : </div>
                      <input className='AddContainer-inputs-input' type='text' spellCheck='false' value={Command.quantite} onChange={(e)=>SetCommand({...Command,"quantite":e.target.value.toUpperCase()})}/>
                    </td>
                  </tr>                  
                </tbody>
              </table>
            </div>
            <input type="button" onClick={Enregistre} value="Enregistre" id='AddContainer-inputs-Enregistre' className='AddContainer-inputs-input' />
          </div>
          :
          SetPage('')
          }
    </div>
  )
}
