import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import Pagination from "./utils/Pagination"
import { Link, useParams } from "react-router-dom"
import Loading from "./utils/Loading"
import { Message } from "../slicer/authSlice"
import { AxiosError } from "axios"
import { DataObject } from "./utils/Products"
import products from "../res/productService"
import { useState } from 'react'



const Search = ():JSX.Element=>{



    const params = useParams()
    const search = params.search as string
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const limit : number = 50
    const {data, isLoading, error, isSuccess, isError } = products.useGetProductsBySearch(limit, skip, search)
    const info = data as DataObject;
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message


    if(isLoading)return <Loading/>
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

            <section className="py-24 mx-10">
                {isSuccess && info?.data.length === 0 ? <div className="text-center my-10">cannot find any product that matches your search</div> :
                    <>
                   
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            
                            {
                                isSuccess && info?.data.map((product)=>(
                                
                                <Link key={product._id} to={`/product/${product._id}`}>
                                
                                    <div  className="max-w-sm rounded overflow-hidden shadow-lg">
                                        <img className="w-full h-40 md:h-48 hover:scale-105 transition duration-500" src={product.images[0]} alt="Product"/>
                                        <div className="p-2">
                                            <div className="text-lg truncate ...">{product.title}</div>
                                            <div className="font-bold text-md">${product.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                            
                        }
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

export default Search

