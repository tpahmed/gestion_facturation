import { createContext,useState } from "react"

export const Devis_Context = createContext()

export default function DevisContext({children}) {

    const [SocieteSelected,SetSocieteSelected] = useState('');
    const [DevisSelected,SetDevisSelected] = useState('');
    const [UpdateDevisFacture,SetUpdateDevisFacture] = useState(0);
    
    return (
        <Devis_Context.Provider value={{ SocieteSelected,SetSocieteSelected,DevisSelected,SetDevisSelected,UpdateDevisFacture,SetUpdateDevisFacture }}>
            {children}
        </Devis_Context.Provider>
    )
}
