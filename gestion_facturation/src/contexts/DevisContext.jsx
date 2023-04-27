import { createContext,useState } from "react"

export const Devis_Context = createContext()

export default function DevisContext({children}) {

    const [SocieteSelected,SetSocieteSelected] = useState('');
    const [DevisSelected,SetDevisSelected] = useState('');
    
    return (
        <Devis_Context.Provider value={{ SocieteSelected,SetSocieteSelected,DevisSelected,SetDevisSelected }}>
            {children}
        </Devis_Context.Provider>
    )
}
