import { useContext, useEffect, useState, useRef } from 'react';
import { Facture_Context } from './contexts/FactureContext';
import ViewPort from './components/ViewPort';
import Holder from "./components/Holder";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import ListeFacture from './components/ListeFacture';


export default function Facture() {
  const {SocieteSelected,FactureSelected} = useContext(Facture_Context);
  const [Societe,SetSociete] = useState({id:'',raison_s:"",contact:'',patente:'',tel:'',ICE:"",RC:""});
  const [Client,SetClient] = useState({id:'',raison_s:"",adresse:'',ICE:"",LE:""});
  const [Facture,SetFacture] = useState({N_facture:'',date_facture:'',date_echeance:'',id_client:''});
  const [Commands,SetCommands] = useState([]);
  const [Total,SetTotal] = useState(0);
  const ViewPortRef = useRef();
  useEffect(()=>{
    async function Update(){
      if (SocieteSelected){
        await axios.get('//localhost:4444/api/societes/'+SocieteSelected).then((e)=>SetSociete(e.data.data[0]));
      }
      if (FactureSelected){
        const Nv_Facture = await axios.get('//localhost:4444/api/Factures/'+FactureSelected);
        SetFacture(Nv_Facture.data.data[0]);
          
      }
    }
    Update()
  },[SocieteSelected,FactureSelected]);
  useEffect(()=>{
    
    async function Update(){
    
        const Nv_Client = await axios.get('//localhost:4444/api/clients/'+Facture.id_client);
        SetClient(Nv_Client.data.data[0]);
        const Nv_Command = await axios.get('//localhost:4444/api/Factures/c/'+Facture.N_facture);
        SetCommands(Nv_Command.data.data);          
    }
    if (Facture.id_client){
        Update()
    }
  },[Facture]);

  useEffect(()=>{
    SetTotal(0);
    Commands.forEach((e)=>SetTotal(Total+(e.prix*e.quantite)))
  },[Commands]);
  
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
    pdf.save(`Facture-${Facture.date_facture}.pdf`);
  };
  return (
    <>
        <Holder>
          <ListeFacture TelechargerPdf={TelechargerPdf}/>
        </Holder>
        <Holder>
          <ViewPort refe={ViewPortRef} commands={Commands} element={{ societe:Societe, client:Client,facture:Facture, prixTotale:Total, Type:false }}/>
        </Holder>
    </>
  )
}
