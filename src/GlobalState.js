import React, {createContext,useReducer} from 'react'
import AppReducer from './reducer.js'

export const GlobalContext = createContext("global");


export const GlobalProvider = ({children}) => {

    const [state,dispatch] = useReducer(AppReducer, "global")
   
    function changeToGlobal(){
        dispatch({type: 'CHANGE_GLOBAL_STATE',
        payload: "global"
        })


    }

    function changeToCountry(){
        dispatch({type: 'CHANGE_GLOBAL_STATE',
        payload: "country"
        })


    }
    console.log(state);
    return (
            <GlobalContext.Provider value = {{state,changeToGlobal,changeToCountry}}>
                {children}
            </GlobalContext.Provider>


    );


}
