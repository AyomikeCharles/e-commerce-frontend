import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { Link } from "react-router-dom"
import Loading from "./utils/Loading"
import { Message } from "../slicer/authSlice"
import { AxiosError } from "axios"
import categories from "../res/categoriesService"



const Allcategory = ():JSX.Element=>{

    const {data, isLoading, error, isSuccess, isError } = categories.useGetCategories()
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message


    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }

   
    return(
        <>
            <Navbar/>

            <section className="py-20 mx-5 md:mx-10">
                <div className="mb-7 text-xl md:text-2xl font-bold">All Categories</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            
                            {
                                isSuccess && data?.map((cats:Cats)=>(
                                
                                <Link key={cats._id} to={`/category/${cats._id}`}>
                                    <div className="flex bg-stone-50 px-3 shadow rounded hover:text-lime-500 py-4">
                                        <img src={cats.icon} className="w-10" alt=""/>
                                        <p>{cats.title}</p>
                                    </div>
                                </Link>
                            ))
                            
                        }
                        </div>
            </section>
                
            <Footer/>
        </>
    )
}

export default Allcategory

