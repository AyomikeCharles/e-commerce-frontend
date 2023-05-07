import jwtDecode from "jwt-decode"
import { useAppSelector } from ".."
import roles from "./roles"

interface MyToken {
    id:string,
    role:string,
    link:string
}

const useAuth = () =>{
    const authUser = useAppSelector(state => state.authUser)
    const token = authUser.user?.accessToken
    let isUser = false
    let isAdmin = false
    let isSuperAdmin = false

    if (token){
        const decoded = jwtDecode<MyToken>(token)
        const { id, role, link } = decoded

      


        if(role === roles.superAdmin){
            isSuperAdmin = true
        }

        if(role === roles.admin){
            isAdmin = true
        }

        if(role === roles.users){
            isUser = true
        }

        return {id, role, link, isAdmin, isUser, isSuperAdmin} 


    }

    return {id:'', role:'', link:'', isAdmin, isUser, isSuperAdmin} 

}

export default useAuth