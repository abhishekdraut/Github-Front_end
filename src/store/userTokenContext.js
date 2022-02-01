import { createContext,useState } from "react";
const UserTokenContext=createContext();

export function UserContextProvider(children){
    const [token,setToken]=useState("");
    const [issues,setIssues]=useState(null);

    return(

        <UserTokenContext.Provider value={{token,issues,setIssues,setToken}} {...children}>


        </UserTokenContext.Provider>

    )
    


}
export default UserTokenContext