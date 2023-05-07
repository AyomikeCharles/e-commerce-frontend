import  { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "./useAuth"


const Protect = ({acceptedRole}:{acceptedRole:string[]}) => {
    const location = useLocation()
    const { role } = useAuth()

    return(
        acceptedRole.includes(role) ?
         <Outlet /> :
        <Navigate to='/' state = {{location}} replace/>//ADD 404 PAGE HERE
    )
}

export default Protect