import {isExpired} from 'react-jwt'

let accessToken=''
const backendUrlUser = "http://localhost:5000/user";

const setRefreshToken=(token)=>{
    if(token===``) localStorage.removeItem(`refresh`)
    else localStorage.setItem(`refresh`,token)
}

const getRefreshToken=()=>{
    return localStorage.getItem('refresh')
}

const setAccessToken=(token)=>{
    accessToken=token
}

const getAccessToken=async ()=>{
    if(accessToken!=='' && !isExpired(accessToken)) return accessToken;
    const api_url=`${backendUrlUser}/refresh`
    try {
        const response=await fetch(api_url,{
            method:"get",
            headers:{
                'Authorization': `bearer ${getRefreshToken()}`
            }

        })
        const data=await response.json()
        setAccessToken(data.accessToken)
        return data.accessToken
    } catch (error) {
        return ''
    }
}

export{
    setAccessToken,
    setRefreshToken,
    getAccessToken,
    getRefreshToken
}