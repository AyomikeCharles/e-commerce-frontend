import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import { useParams } from "react-router-dom";
import { useState, useRef, useEffect  } from 'react';
import { useAppDispatch } from "..";
import { Item, addToCart } from "../slicer/cartSlice";
//swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper';



import { Link } from 'react-router-dom';
import products from "../res/productService";

import { AxiosError } from "axios";
import Loading from "./utils/Loading";
import { Message } from "../slicer/authSlice";
import { FiHeart } from "react-icons/fi";
import { AiTwotoneStar } from "react-icons/ai";
import Spinner from "./utils/Spinner";
import { useMutation } from "react-query";
import wishlist from "../res/wishlist";
import useAuth from "../res/useAuth";
import { ToastContainer, toast } from "react-toastify";




const Product = ():JSX.Element =>{


    let  productId = useParams();
    let id = productId.id;
    let dispatch = useAppDispatch()
    const { id:Id } = useAuth()
    

    const {data, isLoading, error, isSuccess, isError} = products.useGetOneProduct(id as string)
    
    let info = data as Data;

    const [quantity, setQuantity] = useState<number>(1);

    const increasQty = (stock:number|string):void =>{

        if(quantity < (stock as number)){
            const newQty = quantity + 1
            setQuantity(newQty)
        }
        
    }

    const decreaseQty = ():void =>{
        if(quantity>1){
            const newQty = quantity - 1
            setQuantity(newQty)
        }
        
    }


    const newCartItems:Item = {
        id:info?._id, 
        price:info?.price, 
        title:info?.title, 
        description:info?.description, 
        discountPercentage:info?.discountPercentage, 
        rating:info?.rating,
        brand:info?.brand, 
        images:info?.images, 
        stock:info?.stock,
        totalPrice:info?.price,
        qty:quantity
        }


    const [slide, setSlide] = useState(0)
    const slides = useRef<SwiperRef>(null)
    const similarSlides = useRef<SwiperRef>(null)

    const border = {
        border:'solid #8b5cf6 2px',
        borderRadius:'5px',
    }


    //get similar products

    let catId = info?.category

    const {
        data:SimilarData,
        isError:SimilarIsError,
        isLoading:SimilarIsLoading,
        isSuccess:SimilarIsSuccess,
        error:SimilarError

    } = products.useGetProductsByCat(catId as string, 25, 0)

    const err = error as AxiosError;
    const similarErr = SimilarError as AxiosError
    const similarInfo = SimilarData as DataObject
    let errMessage = err?.response?.data as Message
    let similarErrMessage = similarErr?.response?.data as Message



    //add to wishlist
    const addToWishList = useMutation({
        mutationFn:(product:Data)=>{
            return wishlist.addWishlist(product, Id)
        }
    })
    const addWishlist = () =>{
        addToWishList.mutate(info)
    }

    useEffect(()=>{

        if(addToWishList.isLoading){
            //do something
        }

        if(addToWishList.isSuccess){
            toast(addToWishList.data.message)
        }

        if(addToWishList.isError){
            console.log(addToWishList.error)
        }
    }, [addToWishList.isError, addToWishList.isLoading, addToWishList.isSuccess, addToWishList.error, addToWishList.data])
    
    if (isLoading || SimilarIsLoading)return <Loading/>

    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }
    if(SimilarIsError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{similarErrMessage? similarErrMessage.message : 'Network Error'}</div></div>
    }
    


    


    return(
        <>
            <Navbar/>
            {isSuccess &&
            <section className="py-24">
                <div className="block w-11/12 md:flex md:w-10/12 mx-auto">
                    <div className="basis-1/2 md:w-1/2 mx-auto">

                    <Swiper
                            slidesPerView={1}
                            ref = {slides}
                            onSlideChange={()=> setSlide(slides?.current?.swiper.activeIndex as number)}
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

                <div>
                    <div className='flex justify-evenly my-5'>

                    {
                                info.images.map((val, i)=>(
                                    (
                             
                                            <div className="w-3/12" key={i} style={slide === i ?border:undefined} onClick={()=>{slides?.current?.swiper.slideTo(i); setSlide(i)}}>
                                                <img className="rounded m-1 p-1" src={val} alt="..." />
                                            </div>
                              
                                    )
                                ))
                            }
                        
                    </div>
                </div>
            
                </Swiper>
                </div>

                    <div className="basis-1/2 md:ml-3 lg:px-5">
                        <div className="text-2xl font-semibold my-3">{info?.title}</div>
                        <div className="text-xl font-semibold my-1">₦{info?.price}</div>
                        <div className="text-lg font-medium my-1">Brand : {info?.brand}</div>
                        {info?.stock > 0?<div className="text-lg font-medium my-1">stock: {info?.stock}</div>:<div className="text-xl font-semibold my-3 line-through">stock: {info?.stock}</div>}
                        {info?.discountPercentage > 0?<div className="text-lg font-medium my-1">discount: {info?.discountPercentage} %</div>: null }
                        <div className="flex">
                        {

                            Array(5).fill(0).map((_,i)=>{

                                let color = ""

                                if(info?.rating >= i){
                                    color = "text-lime-500"
                                }
                                   return (
                                    <span key={i}>
                                        <AiTwotoneStar className={color}/>
                                    </span>
                                    
                                   )                         
                            })
                        }
                        </div>
                        
                        <div className="my-3">
                            <button onClick={decreaseQty} className="rounded px-3 py-1 border border-lime-500 text-lime-500 transition duration-500  hover:bg-lime-500 hover:text-white ">
                                -
                            </button>
                            <span className="mx-5">
                                {quantity}
                            </span>
                            <button onClick={()=>increasQty(info?.stock)}  className="rounded px-3 py-1 border text-lime-500 border-lime-500 transition duration-500  hover:bg-lime-500 hover:text-white">
                                +
                            </button>
                        </div>
                        
                        <div className="my-3">
                            <button className="p-2 rounded border transition duration-500  hover:bg-lime-500 hover:text-white border-lime-500" onClick={()=>dispatch(addToCart(newCartItems))}>
                                Add to Cart
                            </button> 
                            <Link onClick={()=>dispatch(addToCart(newCartItems))} to='/checkout' className="border border-lime-500 p-3 hover:text-white rounded mx-3 transition duration-500  hover:bg-lime-500">
                                Buy Now
                            </Link>

                            {Id !== '' && <button onClick={addWishlist} className="text-lime-500"><FiHeart/></button>}
                           
                        </div>

                        <div className="my-10">
                            <h3 className="text-2xl font-bold">Description</h3>
                            <div className="text-justify">{info?.description}</div>
                        </div>
                    </div>
                </div> 

                
                <hr className="w-11/12 my-10 mx-auto"/>

                <div className="my-6 md:mx-6 text-xl md:text-2xl font-bold px-5">Similar Products</div>
                <div className="w-11/12 mx-auto">

                    <Swiper
                            modules={[Autoplay]}
                            ref = {similarSlides}
                            breakpoints={{
                                1025: { slidesPerView: 4},
                                768: { slidesPerView: 3},
                                640: { slidesPerView: 2},

                              }}
                            slidesPerView={1.5}
                            spaceBetween={15}
                            autoplay = {{
                            delay:2000,
                            pauseOnMouseEnter:true,
                            }}
                            >

                    {SimilarIsSuccess && SimilarData.hasOwnProperty('stack') ? <div className="flex justify-center"><Spinner/></div>:SimilarIsSuccess && 
                    similarInfo?.data.map((product:Data, i:number)=>
                    {
                        if(product._id !== id){
                            if(i < 6){
                            return(

                            <SwiperSlide key={product._id}>
                                <Link to={`/product/${product._id}`}>
                                    
                                    <div  className="max-w-sm shadow-lg rounded overflow-hidden">
                                        <img className="w-full h-40 hover:scale-105 md:h-48 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                        <div className="p-2 drop-shadow-lg">
                                            <div className="text-lg truncate ...">{product.title}</div>
                                            <div className="font-bold text-md">₦{product.price}</div>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide> 
                        )}}
                        return null
                    })}

                    </Swiper>
                        
                    
                

                </div>

            </section>
            }
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Product;