import Holder from "./Holder";
import './ViewPort.css'

export default function ViewPort({element}) {
  return (
    <Holder>
        <div className="ViewPort">
            <div className="Facture-Header">

                <div className="Facture-RasonSocial">
                    <h1>{element.societe.raison_s}</h1>
                    <h5>Patente : {element.societe.patente}</h5>
                </div>
                <div className="Facture-InfoClient">
                    <h3 className="Facture-InfoClient-Num">Num Client : {element.client.id}</h3>
                    <div className="Facture-InfoClient-Raison">{element.client.raison_s}</div>
                    <div className="Facture-InfoClient-Adresse">{element.client.adresse}</div>
                    <div className="Facture-InfoClient-ICE-LE">
                        <span>ICE : {element.client.ICE}</span>
                        <span>LE : {element.client.LE}</span>
                    </div>
                </div>
            </div>
            <div className="Facture-InfoFacture">
                <div className="Facture-InfoFacture-NumFac">
                    Num Facture : {element.facture.N_facture}
                </div>
                <div className="Facture-InfoSociete-Table">
                    <table>
                        <thead>
                            <tr>
                                <th>date facture</th>
                                <th>date echeance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{element.facture.date_facture}</td>
                                <td>{element.facture.date_echeance}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="Facture-InfoCommand">
                <table>
                    <thead>
                        <tr>
                            <th>Reference</th>
                            <th id="Facture-InfoCommand-Titre">Description</th>
                            <th>Quantite</th>
                            <th>Prix Unitaire</th>
                        </tr>
                    </thead>
                    <tbody>
                    {element.commands.map(command => 
                        <tr>
                            <td>{command.reference}</td>
                            <td>{command.titre}</td>
                            <td>{command.prix}</td>
                            <td>{command.quantite}</td>
                        </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colSpan={2}>Prix Total (DH)</th>
                            <th colSpan={2}>{element.prixTotale}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className="Facture-InfoSociete">
                <h4>{element.societe.raison_s}</h4>
                <div className="Facture-InfoSociete-Contact">{element.societe.contact}</div>
                <div className="Facture-InfoSociete-Juri">
                    <span>TEL : {element.societe.tel}</span>
                    <span>ICE : {element.societe.ICE}</span>
                    <span>RC : {element.societe.RC}</span>
                </div>
            </div>
        </div>

    </Holder>
  )
}
