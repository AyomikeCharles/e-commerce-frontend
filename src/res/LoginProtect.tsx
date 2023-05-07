import  { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "./useAuth"

const LoginProtect = () => {
    const location = useLocation()
    const { id } = useAuth()

    return(
        id !== '' ?
         <Outlet /> :
        <Navigate to='/' state = {{location}} replace/>//ADD 404 PAGE HERE
    )
}

export default LoginProtect