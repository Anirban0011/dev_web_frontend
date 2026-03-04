import { useContext, createContext, useState} from "react"

const ProjectContext = createContext(null)
const useProj = () => useContext(ProjectContext)

 const ProjContextWrapper = ({ children }) => {
    const[proj, setProj] = useState([])
    return (
        <ProjectContext.Provider value={{proj, setProj}}>
        {children}
        </ProjectContext.Provider>
)}

export {ProjContextWrapper, useProj}