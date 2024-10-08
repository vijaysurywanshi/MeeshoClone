//Search context
import { useContext, useState, createContext ,children} from 'react'
const SearchContext = createContext();
const SearchProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        keyword: "",
        results: [],
    });
  
    
    return (<SearchContext.Provider value={[auth, setAuth]}>
        {children}
    </SearchContext.Provider>)
}
//custom 
const useSearch = () => useContext(SearchContext);
export { SearchProvider, useSearch }