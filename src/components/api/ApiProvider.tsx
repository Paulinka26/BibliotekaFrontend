import {LibraryClient} from "./library-clients";
import {createContext, useContext} from 'react';

const ApiContext = createContext( new LibraryClient());
export default function ApiProvider({
                                        children,
                                    }:{
    children: React.ReactNode;
                                    })
{
    const apiClient : LibraryClient = new LibraryClient();
    return(
    <ApiContext.Provider value = {apiClient}>{children}</ApiContext.Provider>
    );
}
export function useApi(){
    return useContext(ApiContext);
}