import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import products from "../res/productService"
import { useParams, Link } from "react-router-dom"
import { AxiosError } from "axios"
import Loading from "./utils/Loading"
import { Message } from "../slicer/authSlice"
import { useState } from "react"
import Pagination from "./utils/Pagination"


const Category = ():JSX.Element=>{

    const params = useParams()
    const id = params.catid
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const limit : number = 50

    const {
        data,
        isError,
        isLoading,
        isSuccess,
        error
    } = products.useGetProductsByCat(id as string, limit, skip)


    const err = error as AxiosError
    const info = data as DataObject
    let errMessage = err?.response?.data as Message
    if (isLoading){return <Loading/>}
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }

    const next = (val:number) => {
        setPage(val)   
        setSkip((val-1)*50)
    }
    
    return(
        <>
            <Navbar/>
            <section className="py-20 px-5">
                <div className="mb-7 text-xl md:text-2xl font-bold">Products</div>
                {isSuccess && info?.data.length === 0 ? <div className="text-center my-10">there are no product in this category</div> :
                <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7">
                    {
                    
                    isSuccess && info?.data.map((product:Data)=>(
                            <Link key={product._id} to={`/product/${product._id}`}>
                            
                                <div  className="max-w-sm shadow-lg bg-white rounded overflow-hidden">
                                    <img className="w-full h-40 hover:scale-105 md:h-48 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                    <div className="p-2 drop-shadow-lg">
                                        <div className="text-lg truncate ...">{product.title}</div>
                                        <div className="font-bold text-md">₦{product.price}</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>


                    <div className="flex justify-center my-10">
                    <Pagination
                            total={info?.total}
                            limit={limit}
                            page={page}
                            next={(val:number)=>next(val)}
                        />
                   </div>
                   </>
                }
            </section>
            
            <Footer/>
        </>
    )
}

export default Category 

