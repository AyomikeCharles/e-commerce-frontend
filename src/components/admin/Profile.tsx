import { Link } from "react-router-dom";
import users from "../../res/userService";
import Loading from "../utils/Loading";
import { AxiosError } from "axios";
import { Message } from "../../slicer/authSlice";


const Profile = () => {

    const { data, isError, isLoading, isSuccess, error } = users.useGetUser()

    const err = error as AxiosError
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
                                    <h3 className="text-2xl font-bold">My Profile</h3>
                                    
                                </div>
                                {isSuccess &&
                                <div>
                                    

                                    <div className="md:flex">
                                        <div className="basis-2/4 md:p-5 content-center">
                                            <h3 className="font-bold text-2xl md:mb-3">{data?.fullName}</h3>
                                            <h5>#{data?._id.slice(-3)}</h5>
                                        </div>
                                        <div className="basis-1/4 flex justify-end my-3">
                                            <div>
                                                <Link className="block rounded transition duration-500 hover:bg-lime-500/50 p-1" to='/admin/profile/editprofille'>Edit Profile</Link>
                                                <Link className="block rounded transition duration-500 hover:bg-lime-500/50 p-1" to='/admin/profile/changepassword'>Change Password</Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 rounded p-3 my-3">
                                        <h3 className="font-bold text-1xl mb-3">Pesonal Details</h3>
                                        <div className="my-2">
                                            Email: {data?.email}
                                        </div>
                                        <div className="my-2">
                                            Number: {data?.phoneNumber}
                                        </div>
                                        {/* not needed for admin */}
                                        {/* {
                                            data?.whatsapp?<div className="my-2">WhatsApp: {data?.whatsapp}</div>:null
                                        }
                                        {
                                            data?.shipping.length > 0 ?<div className="my-2">Shipping: {data?.shipping}</div>:null
                                        } */}
                                       
                                    </div>

                                    

                                    
                                </div>
                                }
                                    
                            </div>
                    </section>
            
        </>
    )
}

export default Profile;