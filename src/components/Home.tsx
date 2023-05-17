import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import Hero from "./utils/Hero"
import Products from "./utils/Products"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from 'react'
import { useAppSelector } from ".."
import { Link } from "react-router-dom"



const Home = ():JSX.Element=>{
    
 
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
            <div className="mb-10 mx-3 md:mx-10">
                <Link className="text-lime-500 p-2 rounded" to='/products'>View All</Link>
            </div>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Home

