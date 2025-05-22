import { createContext, PropsWithChildren, useMemo, useState } from 'react'
import './Auth.css'
import { jwtDecode } from 'jwt-decode'
import User from '../../../models/user/User'


interface AuthContextInterface {
    jwt: string,
    user: User | null,
    isLoading: boolean,
    newLogin (jwt: string): void,
    logout (): void
}

export const AuthContext = createContext<AuthContextInterface | null>(null)




export default function Auth(props: PropsWithChildren): JSX.Element {  
    
    const JWT_KEY_NAME = 'jwt'
    
    const [ jwt, setJwt ] = useState<string>(localStorage.getItem(JWT_KEY_NAME) || '')
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { children } = props

    const user = useMemo(() =>{
        if (!jwt) return null;
        try{
            return jwtDecode<User>(jwt)
        } catch (e) {
            console.error("Invalid token:", e);
            localStorage.removeItem(JWT_KEY_NAME);
            return null
        }
    }, [jwt])

    function newLogin(jwt: string) {
        setIsLoading(true)
        setJwt(jwt)
        localStorage.setItem(JWT_KEY_NAME, jwt)
        setIsLoading(false)
    }

    function logout() {
        setIsLoading(true)
        localStorage.removeItem(JWT_KEY_NAME)
        setJwt('')
        setIsLoading(false)
    }

    return (
        <AuthContext.Provider value={ { jwt, user, isLoading, newLogin, logout } } >
            {children}
        </AuthContext.Provider>
    )
}