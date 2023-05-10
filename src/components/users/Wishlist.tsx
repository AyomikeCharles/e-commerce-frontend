import { Link } from "react-router-dom"
import { AxiosError } from "axios"
import Loading from "../utils/Loading"
import { Message } from "../../slicer/authSlice"
import wishlist from "../../res/wishlist"
import useAuth from "../../res/useAuth"
import { Data } from "../utils/Products"
import { useMutation } from "react-query"
import { useEffect } from "react"
import { ToastContainer, toast } from "react-toastify"


const Wishlist = () =>{

    const { id } = useAuth()


    const { data, isError, isLoading, isSuccess, error, refetch } = wishlist.useGetWishlist(id)

    const removeItem = useMutation({
        mutationFn:(productId:string) =>{
            return wishlist.deleteWishlist(data._id as string, productId)
        },
        onSuccess: data => {
            refetch()
        }
    })
    const remove = (productId:string) => {
        removeItem.mutate(productId)
    }

    useEffect(()=>{
        if(removeItem.isLoading){
            //do something
        }

        if(removeItem.isSuccess){
            toast(removeItem.data.message)
        }

        if(removeItem.isError){
            console.log(removeItem.error)
        }
    }, [removeItem.isError, removeItem.isLoading, removeItem.error, removeItem.data, removeItem.isSuccess])

    const err = error as AxiosError
    let errMessage = err?.response?.data as Message

    if(isLoading)return <Loading/>
  
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }





    return(
        <>
          
                    <section id="content">
                        <div className="px-5 py-10">
                            <div className="mb-12 flex justify-between">
                                <h3 className="text-2xl font-bold">Wishlist</h3>
                            </div>


                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                {isError?
                                
                                <div>{errMessage? errMessage.message : 'Network Error'}</div>
    
                                : isSuccess && data?.product.map((product:Data)=>(
                                    
                                    <div key={product._id}>
                                    <Link to={`/product/${product._id}`}>
                                        <div  className="max-w-sm shadow-lg rounded overflow-hidden">
                                            <img className="w-full h-40 hover:scale-105 md:h-48 transition duration-500" src={product.images[0]} alt="Sunset in the mountains"/>
                                            <div className="p-2 drop-shadow-lg">
                                                <div className="text-lg truncate ...">{product.title}</div>
                                                <div className="font-bold text-md">${product.price}</div>
                                            </div>
                                        </div>
                                    </Link>
                                        <button onClick={()=>remove(product._id)} >remove</button>
                                    </div>
                                ))
                                }
                            </div>

                            
                     

                        </div>
                    </section>
                    <ToastContainer/>
          
        </>
    )
}

export default Wishlist