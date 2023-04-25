import { createContext,useState } from "react"

export const Add_Context = createContext()

export default function AddContext({children}) {

    const [Page,SetPage] = useState('');
    const [Commands,SetCommands] = useState([{reference:"dfs",'titre':"hiiiiiiiiiiiiiiiiiiiiiiiiii","prix":10,"quantite":1}]);
    const [SelectedCommand,SetSelectedCommand] = useState('');
    
    return (
        <Add_Context.Provider value={{ Page,SetPage,Commands,SetCommands,SelectedCommand,SetSelectedCommand }}>
            {children}
        </Add_Context.Provider>
    )
}
