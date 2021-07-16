import { useState, createContext, useContext } from "react";

 const authContext= createContext();

export function AuthContextProv({children}){
    const [auth, setAuth]= useState(true);


return(
    <authContext.Provider value={{
        auth,
        setAuth
    }} >
        {children}
    </authContext.Provider>
)
}

export function useAuthContext(){
    return useContext(authContext);
}