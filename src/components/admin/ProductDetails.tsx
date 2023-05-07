import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect  } from 'react';

//swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import { Link } from 'react-router-dom';
import products from "../../res/productService";
import { Data } from "./../utils/Products";

import { AxiosError } from "axios";
import Loading from "../utils/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import { createPortal } from "react-dom"
import { useMutation } from "react-query";
import { Message } from "../../slicer/authSlice";
import Spinner from "../utils/Spinner";

const Product = ():JSX.Element =>{


    let  productId = useParams();
    let id = productId.id;
    const [openPortal, setOpenPortal] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const navigate = useNavigate()


    const {data, isLoading, error, isSuccess, isError} = products.useGetOneProduct(id as string)
    let info = data as Data;
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message




    

    const [slide, setSlide] = useState(0)
    const sliders = useRef<SwiperRef>(null)
    const border = {
        border:'solid black 2px',
        borderRadius:'5px',
    }





    const deleteProduct = useMutation({
        mutationFn:() =>{
            return products.deleteProduct(id as string)
        }
    })

    const delErr = deleteProduct.error as AxiosError

    useEffect(()=>{

      
        let proErrMessage = delErr?.response?.data as Message

        if(deleteProduct.isLoading){
            setSpinner(true)
        }

        if(deleteProduct.isError){
            if(proErrMessage){
                toast(proErrMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

        if(deleteProduct.isSuccess){
            if(deleteProduct.data.hasOwnProperty('stack')){
                toast(deleteProduct.data.message)
            }else{
                toast(deleteProduct.data.message)
                navigate('/admin/products')
            }
            setSpinner(false)
        }

    }, [deleteProduct.isSuccess, deleteProduct.isError, deleteProduct.isLoading, deleteProduct.data, delErr, navigate])

    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }

    
    return(
        <>
            <section id="content">
                

            {
            isSuccess &&
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Product Details</h3>
                                   
                                </div>
                                <div className="block md:flex justify-center">
                                    <div className="w-full basis-1/2 md:w-[300px] px-5 mx-auto">
                                        <Swiper
                                            ref={sliders}
                                            slidesPerView={1}
                                            onSlideChange={()=> setSlide(sliders?.current?.swiper.activeIndex as number)}
                                        >

                                                {
                                                    info.images.map((val, i)=>(
                                                        (
                                                            <SwiperSlide key={i}>
                                                                <div>
                                                                    <img className="rounded w-full h-full" src={val} alt="..." />
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    ))
                                                }
                                            <div className='flex justify-evenly my-5'>

                                                    {
                                                        info.images.map((val, i)=>(
                                                            (
                                                    
                                                                    <div className="w-3/12" key={i} style={slide === i ?border:undefined} onClick={()=>{sliders?.current?.swiper.slideTo(i); setSlide(i)}}>
                                                                        <img className="rounded m-1 p-1" src={val} alt="..." />
                                                                    </div>
                                                    
                                                            )
                                                        ))
                                                    }
                                                
                                            </div>
                                            

                                        </Swiper>

                                    </div>
                                    <div className="basis-1/2 px-10 w-full">

                                        <div className="text-2xl font-semibold my-1">{info?.title}</div>
                                        <div className="text-lg font-semibold text-lime-500 my-1">N{info?.price}</div>
                                        <div className="text-lg font-medium my-1">Brand: {info?.brand}</div>
                                        {info?.stock > 0?<div className="text-lg font-medium my-1">stock: {info?.stock}</div>:<div className="text-lg font-semibold my-3 line-through">stock: {info?.stock}</div>}
                                        <div className="text-lg font-medium my-1">discount: {info?.discountPercentage} %</div>
                                            {

                                                Array(5).fill(0).map((_,i)=>{

                                                    let color = ""

                                                    if(info?.rating >= i){
                                                        color = "text-lime-500"
                                                    }
                                                    return (
                                                        <span key={i}>
                                                            <FontAwesomeIcon className={color} icon={faStar}/>
                                                        </span>
                                                        
                                                    )                         
                                                })
                                            }
                                    <div className="my-3">
                                        <Link  to={`/admin/products/editproduct/${info._id}`} className="bg-lime-500 px-5 py-3 rounded mx-3 transition duration-500  hover:bg-lime-700">
                                            Edit
                                        </Link>
                                        <button onClick={()=>setOpenPortal(true)} className="px-5 py-3 rounded transition duration-500  hover:bg-lime-600 border-2">
                                            Delete
                                        </button> 
                                    </div>
                                    </div>

                                </div>
                            

                                <hr className="w-10/12 mx-auto"/>

                                <div className="w-10/12 mx-auto my-10">
                                    <h3 className="text-2xl font-bold">Description</h3>
                                    <div>{info?.description}</div>
                                </div>
                            </div>
                        }
                    </section>
                    <ToastContainer/>
                    {openPortal && createPortal(
                        <div className="fixed top-0 left-0 z-50 bg-black/30 w-full h-full pt-32">
                            <div className="flex justify-center">
                                <div className="bg-white  rounded">
                                    <div className="bg-lime-200 rounded-t py-3 text-lg px-2">Delete Product?</div>
                                    <p className="py-4 border-b px-2">are you sure you want to delete this products</p>
                                    <div className="flex justify-end py-2 px-3">
                                        <button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>deleteProduct.mutate()}> {spinner ? <Spinner/> : null} delete</button>
                                        <button className="mt-3 ml-1 bg-gray-200 px-2 py-1 rounded " onClick={()=>setOpenPortal(false)}> cancel </button>
                                    </div>
                                </div>
                            </div>
                    </div>, document.body
                    )}
  
        </>
    )
}

export default Product;