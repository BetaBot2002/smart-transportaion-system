import React from "react";
import { Navigate } from "react-router-dom";
import { getRefreshToken } from "./jwt.helper";

const Protected=({children,needLoggedIn})=>{
    if(needLoggedIn){
        if(!getRefreshToken()) return <Navigate to={`/registration`}/>
        return <>{children}</>
    }
    if(getRefreshToken()) return <Navigate to={`/`}/>
    return <>{children}</>
}

export default Protected