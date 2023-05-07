import { Link } from "react-router-dom";
import products from "../../res/productService";
import { AxiosError } from "axios";
import Loading from "./Loading";
import { Message } from "../../slicer/authSlice";
import { Data, DataObject } from "./Products";
import { useState } from "react";
import Pagination from "./Pagination";

const Allproducts : React.FC = ():JSX.Element =>{

const [skip, setSkip] = useState(0)
const [page, setPage] = useState(1)
const limit : number = 50

const { data, error, isError, isSuccess, isLoading } = products.useGetProducts(limit, skip)

const err = error as AxiosError
let errMessage = err?.response?.data as Message

if(isLoading)return <Loading/>
if(isError){
    return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
}
if(isSuccess && data.hasOwnProperty('stack') ){
    return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
}
    
const info = data as DataObject
const next = (val:number) => {
    setPage(val)   
    setSkip((val-1)*50)
}

    
    return(
        <div className="my-24">
            <div className="mx-3 md:mx-10">
                <div className="my-6 md:m-3 flex justify-between">
                    <div className="text-xl md:text-2xl font-bold ">
                        All products
                    </div>
                    <div>
                        page:{page} of {Math.ceil(info?.total/limit)}
                    </div>

                </div>
                

                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-7">
                    { isSuccess && info?.data.map((product:Data)=>(
                        
                        <Link key={product._id} to={`/product/${product._id}`}>
                        
                            <div  className="max-w-sm shadow-lg rounded overflow-hidden">
                                <img className="w-full h-40 hover:scale-105 md:h-48 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                <div className="p-2 drop-shadow-lg">
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
                    

                   
            </div>
        </div>
    )
}

export default Allproducts