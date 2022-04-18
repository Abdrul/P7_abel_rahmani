import { createContext, useState, useEffect } from "react";

export const UuidContext = createContext();

const UuidContextProvider = props => {


    // const [token, setToken] = useState(null);
    // const [user, setUser] = useState(null);

    // const readLocalStorage = () => {
        
    //     const userId = JSON.parse(localStorage.getItem('user'));
    //     if(token && userId) {
    //         setToken(token);
    //         setUser(userId);
    //         // console.log(token, userId);
    //     };
    // };

    const authHeader = () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if(token) {
            return {Authorization : 'Bearer ' + token}
        } else {
            return {};
        }
    }

    console.log(authHeader());

    // useEffect(() => {
    //     readLocalStorage();
    // }, []);

    return (
        <UuidContext.Provider value={authHeader()}>  
            {props.children}
        </UuidContext.Provider>
    )

}

export default UuidContextProvider;