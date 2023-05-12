import { useParams, Link } from "react-router-dom";
import categories from "../../res/categoriesService"
import { AxiosError } from "axios";
import { Cats } from "../utils/Hero"
import { Message } from "../../slicer/authSlice";
import { ToastContainer } from "react-toastify";
import Loading from "../utils/Loading";


const CategoryDetails = ():JSX.Element =>{

    let  catId = useParams();
    let Id = catId.id as string;

  

  
        const {
            data,
            isError,
            isLoading,
            error,
            isSuccess
        } = categories.useGetOneCategory(Id)

       
        const category = data as Cats
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
                        <h3 className="text-xl font-bold">Category Details</h3>
                        <Link to={`/admin/categories/editcategory/${category._id}`} className="bg-lime-500 p-2 rounded transition duration-500  hover:bg-lime-700">
                            Edit Category
                        </Link>
                    </div>

                {isSuccess && 
                
                    <div className="flex justify-center text-center">
                        <div className="">
                                <img src={category.icon} alt="..." className="mx-auto" width={70} height={70}/>
                                <div className="my-3 text-xl font-bold">{category.title}</div>
                
                            
                            <h3 className="text-2xl font-bold mt-10">Description</h3>
                            <div className=" text-justify">{data?.description}</div>
                        </div>
                    </div> 

                }
                    
            
                
                </div>
            </section>
           <ToastContainer/>
        </>
    )
}

export default CategoryDetails
