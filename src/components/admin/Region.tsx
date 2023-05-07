import { Link } from "react-router-dom"
import { AxiosError } from "axios"
import { Message } from "../../slicer/authSlice"
import region from "../../res/stateService"
import Loading from "../utils/Loading"

export interface S {
    price: string
    region: string
    state: string
    _id: string
}

const Region = () =>{
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        error
    } = region.useGetStates()

    
 
        const err = error as AxiosError;
        let errMessage = err?.response?.data as Message
        if(isLoading)return<Loading/>
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
                                    <h3 className="text-2xl font-bold">States</h3>
                                    <Link to='addregion' className="bg-lime-500 p-3 rounded">Add States</Link>
                                </div>
                                <div>

                                <div className="">
                                        

                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                            {isSuccess &&
                                            
                                            data?.map((state:S, i:number)=>(
                                                <Link key={state._id} to={`regiondetails/${state._id}`}>
                                                
                                                    <div  className="max-w-sm rounded overflow-hidden shadow-lg">
                                                      
                                                        <div className="p-2">
                                                            <div className="">{state.state}</div>
                                                            <div className="">{state.price}</div>
                                                            <div className="">{state.region}</div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                    </section>
 
        </>
    )
}

export default Region