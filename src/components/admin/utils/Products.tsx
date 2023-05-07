import { Link } from "react-router-dom";
import products from "../../../res/productService";
import { DataObject } from "../../utils/Products";
import { AxiosError } from "axios";
import Loading from "../../utils/Loading";
import { Message } from "../../../slicer/authSlice";
import { useState } from 'react'
import Pagination from "../../utils/Pagination";
import { toast, ToastContainer } from "react-toastify";


const Products : React.FC = ():JSX.Element =>{

    const [search, setSearch] = useState('')
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const limit : number = 50
    const {data, isLoading, error, isSuccess, isError } = products.useGetProductsBySearch(limit, skip, search)
    const info = data as DataObject;
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message



  
        const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target
            setSearch(value)
            setSkip(0)
            setPage(0)
        }
      



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
        <div>
            <div className="">
            <form>
                <div className="flex md:w-1/2 my-10 drop-shadow">
                    <input 
                        id="search"
                        type="text"  
                        required 
                        name='search'
                        value={search}
                        onChange={handleChange}
                        placeholder="search by name, price, description or category"
                        className="border p-2 rounded-l focus:outline-none w-full bg-slate-50 dark:bg-slate-400"  
                        />
                </div>
            </form>
                
            
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    
                    {
                        isSuccess && info?.data.map((product)=>(
                        
                        <Link key={product._id} to={`productdetails/${product._id}`}>
                        
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
            </div>
            <ToastContainer/>
        </div>
    )
}

export default Products