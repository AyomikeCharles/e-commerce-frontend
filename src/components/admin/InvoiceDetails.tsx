import { useRef } from "react"
import { useParams } from "react-router-dom";
import sales from "../../res/salesService";
import ReactToPrint from "react-to-print"
import { Info } from './Orders'
import { AxiosError } from "axios";
import Loading from "../utils/Loading";
import { Message } from "../../slicer/authSlice";



const InvoiceDetails = () =>{

    let  orderId = useParams();
    let id = orderId.id;

    const {data, isLoading, error, isSuccess, isError} = sales.useGetOneSales(id as string)


    const printDiv = useRef<HTMLDivElement>(null)

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


    return(
        <>
            
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Invoice Details</h3>
                                   
                                </div>
                                {isSuccess &&

                                <div>
                                    <div ref={printDiv} className="bg-slate-100  rounded p-5">
                                        <div className="flex justify-between">
                                            <div className="">
                                                <h5>
                                                    # {info._id.slice(-6)}
                                                </h5>
                                                <h4 className="my-5 text-2xl font-bold">
                                                    Invoice
                                                </h4>
                                            </div>
                                            <div>
                                                <h5>{info.updatedAt.slice(0, 10)}</h5>
                                                <h3 className="my-5 text-2xl font-bold">logo</h3>
                                            </div>
                                        </div>
                                        <hr/>
                                        <div className="md:flex justify-between">
                                            <div>
                                                <h5 className="my-3 font-bold">bill from</h5>
                                                <h4>our name</h4>
                                                <h4>our address</h4>
                                                <h4>09087654321</h4>
                                                <h4>ouremail@gmail.com</h4>


                                            </div>
                                            <div>
                                                <h5 className="my-3 font-bold">bill to</h5>

                                                <h4>{info.personalDetails[0]}</h4>
                                                <h4>{info.shipping}</h4>
                                                <h4>{info.personalDetails[2]}</h4>
                                                <h4>{info.personalDetails[1]}</h4>

                                            </div>                                            
                                        </div>
                                        <hr className="my-3"/>

                                        <div className="bg-slate-100 hidden md:flex justify-between p-2 rounded my-2">
                                            <div className="basis-1/4">Product</div>
                                            <div className="basis-1/4">Quantity</div>
                                            <div className="basis-1/4">Price</div>
                                            <div className="basis-1/4">Total</div>
                                        </div>

                                        {info.products.map((product)=>{

                                            const productTotal = (product.price * product.qty) - ((product.price * product.qty) * (product.discountPercentage / 100))
                                            const productPrice = (product.price) - ((product.price) * (product.discountPercentage / 100))
                                            
                                            return(
                                                <div key={product.id} className="md:flex justify-around p-2 rounded my-2">
                                                    <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Product: </div> <div className="basis-1/2">{product.title}</div></div>
                                                    <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Quantity: </div> <div className="basis-1/2">{product.qty}</div></div>
                                                    <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Price: </div> <div className="basis-1/2">{productPrice}</div></div>
                                                    <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/2">Total: </div> <div className="basis-1/2">{productTotal}</div></div>
                                                </div>
                                            )

                                        })

                                        }

                                        

                                        

                                        <div className="flex justify-end">
                                            <div>
                                                <h5>Subtotal {info.subtotal}</h5>
                                                <h5>Shipping {info.shippingPrice}</h5>
                                                <h5 className="font-bold">Total { parseInt(info.subtotal) + parseInt(info.shippingPrice)}</h5>
                                            </div>
                                        </div>
                                    </div>






                                  <div className="my-5 flex justify-end">
                                        <ReactToPrint trigger={()=><button className="bg-lime-500 hover:bg-lime-700 px-5 py-3 rounded">print</button>} content={()=>printDiv.current}/>
                                    </div>
                                </div>
                                }
                            </div>
                    </section>
            
        </>
    )
}

export default InvoiceDetails