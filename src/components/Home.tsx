import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import Hero from "./utils/Hero"
import Products from "./utils/Products"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from ".."
import { Link } from "react-router-dom"
// import { reset, logout } from "../slicer/authSlice"
// import TokenService from "../res/tokenService"


const Home = ():JSX.Element=>{
    // const dispatch = useAppDispatch()
    // dispatch(reset())
    // dispatch(logout())
    // TokenService.removeUser()
 
    const userAuth = useAppSelector(state => state.authUser)
    const { user, isError, isLoading, isSuccess, message, logoutMessage } = userAuth

    useEffect(()=>{
        if(logoutMessage!==''){
            if(typeof logoutMessage === 'object'){
                toast(logoutMessage?.message)
            }
        }
    }, [user, isError, isLoading, isSuccess, message, logoutMessage])
    
    return(
        <>
            <Navbar/>
            <Hero/>
            <Products/>
            <div className="m-10">
                <Link className="bg-lime-500 p-2 rounded" to='/products'>View All</Link>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Home

