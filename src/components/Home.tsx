import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import Hero from "./utils/Hero"
import Products from "./utils/Products"
import { ToastContainer, toast } from "react-toastify"
import { useEffect } from 'react'
import { useAppSelector } from ".."
import { Link } from "react-router-dom"
import ThreeRandomCategories from "./utils/Categories"



const Home = ():JSX.Element=>{
    
 
    const userAuth = useAppSelector(state => state.authUser)
    //handle logout here
    
    return(
        <>
            <Navbar/>
            <Hero/>
            <div className="px-3 md:px-10">
            <ThreeRandomCategories/>
            <Products/>
            <div className="mb-10 mx-3 md:mx-10">
                <Link className="p-2 border-2 rounded" to='/products'>View All</Link>
            </div>
            </div>
            
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Home

