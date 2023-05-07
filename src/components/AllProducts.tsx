import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import Allproducts from "./utils/Allproducts"
import { ToastContainer } from "react-toastify"



const AllProducts = ():JSX.Element=>{
 

    
    return(
        <>
            <Navbar/>
            <Allproducts/>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default AllProducts

