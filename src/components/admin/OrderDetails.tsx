import { AxiosError } from "axios";
import { useParams } from "react-router-dom";
import sales from "../../res/salesService";
import { Info } from './Orders'
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "react-query";
import { Message } from "../../slicer/authSlice";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../utils/Spinner";
import Loading from "../utils/Loading";



const OrderDetails = () =>{

    const [portalShow, setPortalShow] = useState(false)


    let  orderId = useParams();
    let id = orderId.id;

    const [spinner, setSpinner] = useState(false)
    const queryClient = useQueryClient()
    const updateSales = useMutation({
        mutationFn:(info:string) =>{
            return sales.updateSalesStatus(id as string, info)
        },
        onSuccess: data => {
            queryClient.setQueryData(["sales", id], data)
            refetch()
        }
    })
    const {data, isLoading, error, isSuccess, isError, refetch} = sales.useGetOneSales(id as string)


    const mErr = updateSales.error as AxiosError;

    useEffect(()=>{

        let errMMessage = mErr?.response?.data as Message

        if(updateSales.isLoading){
            setSpinner(true)
        }

        if(updateSales.isSuccess){
            toast(updateSales?.data?.message)
            setSpinner(false)
        }

        

        if(updateSales.isError){
            if(errMMessage){
                toast(errMMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[updateSales.isSuccess, updateSales.data, updateSales.isError, mErr, updateSales.isLoading])
    
    const info = data as Info
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message
    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }


    const showPortal = () =>{
        setPortalShow(!portalShow)
    }


    
    return(
        <>
           
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Order Details</h3>
                                   
                                </div>
                                {isSuccess &&
                                <div>
                                    <div className="">
                                        {
                                            info?.transactionStatus === 'processing' && 
                                        <div className="flex justify-end">
                                            <button className="bg-lime-500 rounded p-2" onClick={showPortal}>complete transaction</button> 
                                        </div>
                                        }
                                        

                                        <div className="flex justify-between bg-slate-100 rounded p-5 my-3">
                                            <div className="">
                                                <h5>
                                                    # {info?._id.slice(-6)}
                                                </h5>
                                            </div>
                                            <div>
                                                <h5>{info?.transactionStatus}</h5>
                                                <h5>{info?.paymentStatus}</h5>
                                
                                            </div>
                                        </div>
                                     
                                       
                                           
                                            <div className="bg-slate-100 rounded p-5 my-3">
                                                <h3 className="my-3 text-1xl font-bold">Customer Details</h3>
                                                <h4>{info?.personalDetails[0]}</h4>
                                                <h4>{info?.shipping}</h4>
                                                <h4>{info?.personalDetails[2]}</h4>
                                                <h4>{info?.personalDetails[1]}</h4>

                                            </div>                                            
                                  
                                       
                                        <div className="bg-slate-100 rounded p-5 my-3">
                                            <h3 className="my-3 text-1xl font-bold">Order Details</h3>

                                            <div className="bg-slate-100 hidden md:flex justify-between p-2 rounded my-2">
                                                <div className="basis-1/4">Product</div>
                                                <div className="basis-1/4">Quantity</div>
                                                <div className="basis-1/4">Price</div>
                                                <div className="basis-1/4">Discount</div>
                                                <div className="basis-1/4">Total</div>
                                            </div>
                                            {
                                                info.products.map((product)=>{
                                                    const productTotal = (product.price * product.qty) - ((product.price * product.qty) * (product.discountPercentage / 100))
                                                    return(
                                                        <div key={product.id} className="md:flex justify-around p-2 rounded my-2">
                                                            <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Product: </div> <div className="basis-1/2">{product.title}</div></div>
                                                            <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Quantity: </div> <div className="basis-1/2">{product.qty}</div></div>
                                                            <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Price: </div> <div className="basis-1/2">{product.price}</div></div>
                                                            <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">discount: </div> <div className="basis-1/2">{product.discountPercentage}</div></div>
                                                            <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Total: </div> <div className="basis-1/2">{productTotal}</div></div>
                                                        </div>
                                                    )
                                                })
                                            }

                                            

                                        </div>
                                        <div className="bg-slate-100 rounded p-5 my-3">
                                            <div>
                                                <h5>Subtotal {info.subtotal}</h5>
                                                <h5>Shipping {info.shippingPrice}</h5>
                                                <h5 className="font-bold">Total { parseInt(info.subtotal) + parseInt(info.shippingPrice)}</h5>
                                            </div>
                                        </div>
                                    </div>
                                  
                                </div>
                                }
                            </div>
                    </section>

                    {portalShow && createPortal(


                            <div className="fixed top-0 left-0 z-50 bg-black/30 w-full h-full pt-32">
                                <div className="flex justify-center">
                                    <div className="bg-white  rounded">
                                        <div className="bg-lime-200 rounded-t py-3 text-lg px-2">Complete Transaction?</div>
                                        <p className="py-4 border-b px-2">has this transaction been completed</p>
                                        <div className="flex justify-end py-2 px-3">

                                            <button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>{updateSales.mutate('completed'); showPortal()}}>{spinner ? <Spinner/> : null} complete</button>
                                            <button className="mt-3 ml-1 bg-gray-200 px-2 py-1 rounded " onClick={showPortal}>cancel</button>
                                        </div>
                                    </div>
                                </div>
                        </div>, document.body)

                    }

                    <ToastContainer/>
              
        </>
    )
}

export default OrderDetails