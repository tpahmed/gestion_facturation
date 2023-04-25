import { createContext,useState } from "react"

export const Add_Context = createContext()

export default function AddContext({children}) {

    const [Page,SetPage] = useState('');
    
    return (
        <Add_Context.Provider value={{ Page,SetPage }}>
            {children}
        </Add_Context.Provider>
    )
}
