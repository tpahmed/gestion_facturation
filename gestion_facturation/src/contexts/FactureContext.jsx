import { createContext,useState } from "react"

export const Facture_Context = createContext()

export default function FactureContext({children}) {

    const [SocieteSelected,SetSocieteSelected] = useState('');
    const [FactureSelected,SetFactureSelected] = useState('');
    
    return (
        <Facture_Context.Provider value={{ SocieteSelected,SetSocieteSelected,FactureSelected,SetFactureSelected }}>
            {children}
        </Facture_Context.Provider>
    )
}
