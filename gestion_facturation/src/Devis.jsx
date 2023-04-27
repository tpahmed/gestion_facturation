import { useContext, useEffect, useState, useRef } from 'react';
import { Devis_Context } from './contexts/DevisContext';
import ViewPort from './components/ViewPort';
import Options from "./components/Options";
import Holder from "./components/Holder";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import ListeDevis from './components/ListeDevis';


export default function Devis() {
  const {SocieteSelected,DevisSelected,SetDevisSelected} = useContext(Devis_Context);
  const [Societe,SetSociete] = useState({id:'',raison_s:"",contact:'',patente:'',tel:'',ICE:"",RC:""});
  const [Client,SetClient] = useState({id:'',raison_s:"",adresse:'',ICE:"",LE:""});
  const [Devis,SetDevis] = useState({N_devis:'',date_devis:'',id_client:''});
  const [Commands,SetCommands] = useState([]);
  const [Total,SetTotal] = useState(0);
  const ViewPortRef = useRef();
  let currentDate = new Date().toJSON().slice(0, 10);
  useEffect(()=>{
    async function Update(){
      if (SocieteSelected){
        await axios.get('//localhost:4444/api/societes/'+SocieteSelected).then((e)=>SetSociete(e.data.data[0]));
      }
      if (DevisSelected){
        const Nv_Devis = await axios.get('//localhost:4444/api/devis/'+DevisSelected);
        SetDevis(Nv_Devis.data.data[0]);
          
      }
    }
    Update()
  },[SocieteSelected,DevisSelected]);
  useEffect(()=>{
    
    async function Update(){
    
      if (Devis.id_client){
        const Nv_Client = await axios.get('//localhost:4444/api/clients/'+Devis.id_client);
        SetClient(Nv_Client.data.data[0]);
        const Nv_Command = await axios.get('//localhost:4444/api/devis/c/'+Devis.N_devis);
        SetCommands(Nv_Command.data.data);          
      }
      SetTotal(0);
      Commands.forEach((e)=>SetTotal(Total+(e.prix*e.quantite)))
    }
    Update()
  },[Devis]);
  
  const TelechargerPdf = async () => {
    const element = ViewPortRef.current;
    element.style.transform = 'scale(250%) translateX(-50%) translateY(-50%)'; 
    const canvas = await html2canvas(element);
    element.style.transform = 'translateX(-50%) translateY(-50%)'; 
  
    const data = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF();
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight =
      (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Devis-${Devis.date_devis}.pdf`);
  };
  return (
    <>
        <Holder>
          <ListeDevis TelechargerPdf={TelechargerPdf}/>
        </Holder>
        <Holder>
          <ViewPort refe={ViewPortRef} commands={Commands} element={{ societe:Societe, client:Client,facture:Devis, prixTotale:Total, Type:true }}/>
        </Holder>
    </>
  )
}
