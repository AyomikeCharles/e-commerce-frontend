import categories from "../../res/categoriesService"
import { Cats } from "../utils/Hero"
import { Link } from "react-router-dom"
import { AxiosError } from "axios"
import { Message } from "../../slicer/authSlice"
import Loading from "../utils/Loading"


const Categories = () =>{
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        error
    } = categories.useGetCategories()

    
    const cAtegories = data as Cats[]
    const err = error as AxiosError;


        let errMessage = err?.response?.data as Message
        if(isLoading){
            return<Loading/>
        }

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
                                    <h3 className="text-2xl font-bold">Categories</h3>
                                    <Link to='addcategories' className="bg-lime-500 p-3 rounded">Add Categories</Link>
                                </div>
                                <div>

                                <div className="">


                                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                                            { isSuccess &&
                                            
                                            cAtegories?.map((cats:Cats, i:number)=>(
                                                <Link key={cats._id} to={`categorydetails/${cats._id}`}>
                                                
                                                    <div  className="max-w-sm rounded overflow-hidden shadow-lg flex justify-center">
                                                        <div className="">
                                                        <img className="mx-auto hover:scale-105 transition duration-500" src={cats?.icon} alt="" width={80} height={80}/>
                                                            <div className="text-lg">{cats.title}</div>
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

export default Categories