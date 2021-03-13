import React, {useContext,useState} from "react"
import axios from "axios"
const AuthContext = React.createContext()

export function useAuth()
{
    return useContext(AuthContext)
}

export function AuthProvider({ children }) 
{
    const [currentUser, setCurrentUser] = useState()
    const [auth,setAuth] = useState()
    const [token,setToken] = useState()
    const [permissions,setPremissions] = useState()

    const [signUpFlag,setSignUpFlag] = useState()

    // const [loading,setLoading] = useState(true)


    const  login = (email,password) =>
    {
        let obj = {username : email , password : password}
        axios.post("http://localhost:9000/api/users/login",obj)
        .then(resp => 
            {
                setAuth(resp.data.auth)
                setToken(resp.data.token)
                sessionStorage["permissions"] =   [resp.data.permissions]
            })
    }

    const signupFunc = (email,password) =>
    {

        let obj = {username : email , password : password}
        axios.post("http://localhost:9000/api/users/signup",obj)
        .then(resp =>
            {
                setSignUpFlag(resp.data)
            })
    }
    const value = {
        currentUser,
        login,
        auth,
        setAuth,
        token,
        signUpFlag,
        signupFunc,
        setCurrentUser,
        permissions,
        setPremissions
        
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}