import { createContext,useState } from "react"

export const Add_Context = createContext()

export default function AddContext({children}) {

    const [Page,SetPage] = useState('');
    const [SocieteSelected,SetSocieteSelected] = useState('');
    const [ClientSelected,SetClientSelected] = useState('');
    const [Type,SetType] = useState(true);
    const [Flash,SetFlash] = useState(<></>);

    const [Commands,SetCommands] = useState([]);
    const [SelectedCommand,SetSelectedCommand] = useState('');
    
    return (
        <Add_Context.Provider value={{ Page,SetPage,Commands,SetCommands,Type,SetType,SelectedCommand,SetSelectedCommand,SocieteSelected,SetSocieteSelected,ClientSelected,SetClientSelected,Flash,SetFlash }}>
            {children}
        </Add_Context.Provider>
    )
}
