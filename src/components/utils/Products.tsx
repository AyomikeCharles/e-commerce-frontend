import { Link } from "react-router-dom";
import products from "../../res/productService";
import { AxiosError } from "axios";
import Loading from "./Loading";
import { Message } from "../../slicer/authSlice";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


const Products : React.FC = ():JSX.Element =>{

    const [select, setSelect] = useState('latest')


const { data, error, isError, isSuccess, isLoading } = products.useGetProducts(35, 0)

const err = error as AxiosError
let errMessage = err?.response?.data as Message

if(isLoading)return <Loading/>
if(isLoading)return <Loading/>
if(isError){
    return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
}
if(isSuccess && data.hasOwnProperty('stack') ){
    return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
}
    

const info = data as DataObject
    
    return(
        <div className="mb-24">
            <div className="mx-3 md:mx-10">
            <div className="my-5 text-xl md:text-3xl font-bold">Products Overview</div>
                <div className="flex my-10 space-x-5">
                <div onClick={()=>setSelect('latest')} className={`${select === 'latest' ? '' : 'text-stone-400'} transition-all duration-300 cursor-pointer`}>Latest Products</div>
                <div onClick={()=>setSelect('best')} className={`${select === 'best' ? '' : 'text-stone-400'} transition-all duration-300 cursor-pointer`}>Best Sellers</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-9">
                    <AnimatePresence>
                    { select === 'latest' && isSuccess && info?.data.map((product:Data)=>(
                        
                        
                        
                            <motion.div 
                                key={product._id} 
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                exit={{opacity:0}}
                                transition={{duration:0.5}}
                            >
                                <Link  to={`/product/${product._id}`}>
                                <img className="w-full hover:scale-105 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                <div className="py-2">
                                    <div className="truncate ...">{product.title}</div>
                                    <div className="font-bold text-md">₦{product.price}</div>
                                </div>
                                </Link>
                            </motion.div>
                    ))}


</AnimatePresence>
<AnimatePresence>


                    { select === 'best' && isSuccess && info?.data.map((product:Data)=>(
                        
                        
                            <motion.div 
                                key={product._id} 
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                exit={{opacity:0}}
                                transition={{duration:0.5}}
                                >
                        <Link to={`/product/${product._id}`}>

                                <img className="w-full hover:scale-105 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                <div className="py-2">
                                    <div className="truncate ...">{product.title}</div>
                                    <div className="font-bold text-md">₦{product.price}</div>
                                </div>
                        </Link>

                            </motion.div>
                    ))}
                </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default Products