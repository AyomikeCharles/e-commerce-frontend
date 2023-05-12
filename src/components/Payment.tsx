import { PaystackButton } from "react-paystack"
import { useNavigate, useParams } from "react-router-dom"
import sales from "../res/salesService"
import Loading from "./utils/Loading"
import { AxiosError } from "axios"
import { Message } from "../slicer/authSlice"
import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { Item } from "../slicer/cartSlice"
import { ToastContainer, toast } from "react-toastify"
import { useMutation } from "react-query"
import { useEffect } from "react"

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
                    
                    <div>
                        <p>
                          total:  {(parseInt(product?.shippingPrice) + parseInt(product?.subtotal))}
                        </p>
                        <div className="mt-5 bg-lime-500 p-3 rounded inline-flex">
                            <PaystackButton {...componentProps} />
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