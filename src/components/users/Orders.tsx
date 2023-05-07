import { Link } from "react-router-dom"
import sales from "../../res/salesService"
import { AxiosError } from "axios"
import { Item } from "../../slicer/cartSlice"
import Loading from "../utils/Loading"
import { Message } from "../../slicer/authSlice"
import { useState } from 'react'
import Pagination from "../utils/Pagination"

export interface Info {
    createdAt: string
    paymentStatus: string
    personalDetails: string[]
    products: Item[]
    shipping: string[]
    transactionStatus: string
    updatedAt: string
    subtotal:string
    shippingPrice:string
    user: string
    _id: string
    }


const UserOrders = () =>{


    const [search, setSearch] = useState('')
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const limit : number = 50

    const { data, isError, isLoading, isSuccess, error } = sales.useGetUserSales(limit, skip, search)

    const err = error as AxiosError
    let errMessage = err?.response?.data as Message

    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }




    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
        setSkip(0)
        setPage(0)
    }


    const next = (val:number) => {
        setPage(val)   
        setSkip((val-1)*50)
    }


    return(
        <>
          
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Orders</h3>
                                </div>


                            {isSuccess && data?.data.length === 0 ? <div>You have not made any Purchase yet </div>:

                                <div>

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

                                <div>
                                    <div className="bg-slate-100 hidden md:flex justify-between p-2 rounded my-2">
                                        <div className="basis-1/5">transaction id</div>
                                        <div className="basis-1/5">username</div>
                                        <div className="basis-1/5">status</div>
                                        <div className="basis-1/5">payment</div>
                                        <div className="basis-1/5">date</div>
                                        <div className="basis-1/5">action</div>
                                    </div>

                                 
                                    {isSuccess &&
                                        data.data?.map((info:Info)=>(

                                            <div key={info._id} className="bg-slate-100 md:flex justify-around p-2 rounded my-2">
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">transaction id: </div> <div className="basis-1/2">#{info._id.slice(-6)}</div></div>
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">username: </div> <div className="basis-1/2">{info?.personalDetails[0]}</div></div>
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">status: </div> <div className="basis-1/2">{info.transactionStatus}</div></div>
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">payment: </div> <div className="basis-1/2">{info.paymentStatus}</div></div>
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">date: </div> <div className="basis-1/2">{info.createdAt.slice(0, 10)}</div></div>
                                                <div className="basis-1/5 flex md:block"><div className="md:hidden basis-1/2">action: </div> <div className="hover:cursor-pointer basis-1/2 text-lime-500"><Link to={`orderdetails/${info._id}`}>view</Link></div></div>
                                            </div>
                                            
                                        ))
                                    }
                                 
                                    
                                </div>
                                <div className="flex justify-center my-10">
                                    <Pagination
                                        total={data?.total}
                                        limit={limit}
                                        page={page}
                                        next={(val:number)=>next(val)}
                                    />
                                </div>

                            </div>


                            }

                        </div>
                    </section>
          
        </>
    )
}

export default UserOrders