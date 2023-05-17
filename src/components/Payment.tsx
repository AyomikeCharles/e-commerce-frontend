import { PaystackButton } from "react-paystack"
import { Link, useNavigate, useParams } from "react-router-dom"
import sales from "../res/salesService"
import Loading from "./utils/Loading"
import { AxiosError } from "axios"
import { Message } from "../slicer/authSlice"
import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { Item } from "../slicer/cartSlice"
import { ToastContainer, toast } from "react-toastify"
import { useMutation } from "react-query"
import { useEffect, useState } from "react"

const Payment = () => {

    interface Sale {
        createdAt: string
        moreDetails: string
        paymentStatus: string
        personalDetails: string[]
        products: Item[]
        shipping: string[]
        shippingPrice: string
        subtotal: string
        transactionStatus: string
        updatedAt: string
        __v: number
        _id: string
    }
    
    const params = useParams()
    const id = params.transId as string
    const [paystack, setPayStack] = useState(true)

    const { data, isError, isSuccess, isLoading, error } = sales.useGetOneSales(id)

    const product = data as Sale
    const err1 = error as AxiosError;
    let errMessage1 = err1?.response?.data as Message

    const payMutation = useMutation({
        mutationFn:(info:string)=>{
            return sales.updatepayment(info)
        }
    })

    const navigate = useNavigate()

    useEffect(()=>{

        if(payMutation.isLoading){
            toast('verifying payment')
        }

        if(payMutation.isSuccess){
            if(payMutation.data?.hasOwnProperty('stack')){
                toast(payMutation.data?.message)
            }else{
                toast(payMutation.data?.message)
                navigate('/')
            }
            
        }

        if(payMutation.isError){
            console.log(payMutation.error)
        }

    }, [payMutation.isLoading, payMutation.isSuccess, payMutation.isError, payMutation.data, navigate, payMutation.error])


    const componentProps = {
        reference:product?._id,
        email:product?.personalDetails[1],
        amount:(parseInt(product?.shippingPrice) + parseInt(product?.subtotal))*100,
        metadata:{
          name:product?.personalDetails[0],
          phone:product?.personalDetails[2],
          custom_fields: [
            {
              display_name: 'e-commerce',
              variable_name: 'e-commerce',
              value: 'e-commerce',
            },
          ],
        },
        publicKey:'pk_test_b95a03dd8244266987f5fbd2ad8b31e10483a5ff',
        text: "Pay Now",
        onSuccess: (transaction:any) =>{
            if(transaction?.status === 'success'){
                payMutation.mutate(transaction?.reference as string)
            }
            toast(transaction?.message)
        },
        onClose: () => toast("Wait! Don't leave :("),
      }
      

      if(isLoading) return <Loading/>
      if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage1? errMessage1.message : 'Network Error'}</div></div>
      }
      if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }


      


    return(
        <>
            <Navbar/>
                <section className="py-24 flex justify-center">

                    {
                        isSuccess && 
                    
                    <div className="md:flex justify-center md:w-8/12 mx-auto">
                        <div className="basis-1/2 p-3">
                            <div className="bg-white rounded p-5">
                                <h3 className="my-3 text-lg font-bold">How would you like to pay</h3>
                                <button onClick={()=>setPayStack(true)} className="border border-lime-500 rounded p-2 mx-2 hover:bg-lime-500 hover:text-white">Pay Stack</button>
                                <button onClick={()=>setPayStack(false)} className="border border-lime-500 rounded p-2 mx-2 hover:bg-lime-500 hover:text-white">On delivery</button>
                            </div>
                        </div>
                        <div className="basis-1/2 p-3">
                            <div className="max-h-[300px] overflow-y-auto bg-white">
                                {
                                    data?.products.map((val:Item)=>(
                                        <div key={val.id} className="p-3 flex">
                                            <img src={val.images[0]} className="w-4/12 rounded drop-shadow" alt="..."/>
                                            <div className="px-3">
                                                <div className="my-1">{val.title}</div>
                                                <div className="my-1">{val.price}</div>
                                                <div className="my-1">{val.qty}</div>
                                                <div className="my-1">{val.qty * val.price}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>

                        


                            {paystack ?
                                <div className="bg-white rounded px-5 pb-5">
                                    <p className="font-bold">
                                    total: ₦ {(parseInt(product?.shippingPrice) + parseInt(product?.subtotal))}
                                    </p>
                                    <div className="mt-5 bg-lime-500 text-white p-3 rounded inline-flex">
                                        <PaystackButton {...componentProps} />
                                    </div>
                                </div>
                             :
                                <div className="bg-white rounded px-5 py-3">
                                    <p className="font-bold">
                                        total: ₦ {(parseInt(product?.shippingPrice) + parseInt(product?.subtotal))}
                                    </p>
                                    {data.shipping[1] === 'warri south' || data.shipping[0] === 'Lagos' ?
                                        <p className="my-5">
                                            transaction is currently been process, we will get back to you shortly, thank you for shopping with us :)
                                        </p>
                                        
                                        :
                                        <p className="my-5">
                                            this payment method is not available in your region, kindly choose another payment method, thank you for shopping with us :)
                                        </p>
                                        
                                    }
                                    <Link className="bg-lime-500 text-white p-3 rounded " to='/'>Finish</Link>
                                </div>
                            }
                            
                            
                        </div>
                        
                    </div>
                    }
                </section>
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default Payment