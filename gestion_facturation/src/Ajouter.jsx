import { useContext, useEffect, useState, useRef } from 'react';
import { Add_Context } from './contexts/AddContext';
import ViewPort from './components/ViewPort';
import Options from "./components/Options";
import Holder from "./components/Holder";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from 'axios';


export default function Ajouter() {
  const {Commands,Type,SocieteSelected,ClientSelected} = useContext(Add_Context);
  const [Societe,SetSociete] = useState({id:'',raison_s:"",contact:'',patente:'',tel:'',ICE:"",RC:""});
  const [Client,SetClient] = useState({id:'',raison_s:"",adresse:'',ICE:"",LE:""});
  const [Total,SetTotal] = useState(0);
  const ViewPortRef = useRef();
  let currentDate = new Date().toJSON().slice(0, 10);
  const [Donne,SetDonne] = useState({	N_devis:'■',N_facture:'■',date_facture:currentDate,date_echeance:currentDate,date_devis:currentDate});
  useEffect(()=>{
    if (SocieteSelected !== ''){
      axios.get('//localhost:4444/api/societes/'+SocieteSelected).then((e)=>SetSociete(e.data.data[0]))
    }
    if (ClientSelected !== ''){
      axios.get('//localhost:4444/api/clients/'+ClientSelected).then((e)=>SetClient(e.data.data[0]))
    }
    SetTotal(0);
    Commands.forEach((e)=>SetTotal(Total+(e.prix*e.quantite)))
  },[SocieteSelected,ClientSelected,Commands]);
  const Enregistre = async ()=>{
    if(!ClientSelected || !SocieteSelected){
      alert("Vous devez selectioner une Societe et un Client")
      return
    }
    if (Type){
      await axios.post('//localhost:4444/api/devis',{"id_client":ClientSelected,"id_societe":SocieteSelected,"date_devis":currentDate}).then(async (e)=>{
        SetDonne({...Donne,N_devis:e.data.insertId});
        await Commands.forEach((e)=>axios.put('//localhost:4444/api/devis',{...e,id_devis:e.data.insertId}))
      });
    }
    else{
      await axios.post('//localhost:4444/api/factures',{"id_client":ClientSelected,"id_societe":SocieteSelected,"date_facture":currentDate,"date_echeance":currentDate}).then(async (e)=>{
        SetDonne({...Donne,N_facture:e.data.insertId});
        await Commands.forEach((e)=>axios.put('//localhost:4444/api/factures',{...e,id_facture:e.data.insertId}));

      });
    }
    
  }
  const EnregistreTelechager = async ()=>{
    if(!ClientSelected || !SocieteSelected){
      alert("Vous devez selectioner une Societe et un Client")
      return
    }
    if (Type){
      await axios.post('//localhost:4444/api/devis',{"id_client":ClientSelected,"id_societe":SocieteSelected,"date_devis":currentDate}).then(async (e)=>{
        console.log(e.data.data);
      SetDonne({...Donne,N_devis:e.data.data.insertId});
        await Commands.forEach((el)=>axios.put('//localhost:4444/api/devis',{...el,id_devis:e.data.data.insertId}))
      });
    }
    else{
      await axios.post('//localhost:4444/api/factures',{"id_client":ClientSelected,"id_societe":SocieteSelected,"date_facture":currentDate,date_echeance:currentDate}).then(async (e)=>{
        SetDonne({...Donne,N_facture:e.data.insertId});
        await Commands.forEach((el)=>axios.put('//localhost:4444/api/factures',{...el,id_devis:e.data.insertId}));

      });
    }
    await TelechargerPdf();

  }
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
    pdf.save(`${Type ? "Devis" : "Facture"}-${currentDate}.pdf`);
  };
  return (
    <>
        <Holder>
          <Options Enregistre={Enregistre} EnregistreTelechager={EnregistreTelechager}/>
        </Holder>
        <Holder>
          <ViewPort refe={ViewPortRef} commands={Commands} element={{ societe:Societe, client:Client,facture:Donne, prixTotale:Total, Type }}/>
        </Holder>
    </>
  )
}
