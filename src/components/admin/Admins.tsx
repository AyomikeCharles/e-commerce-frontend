
import { Link } from "react-router-dom"
import users from "../../res/userService";
import { AxiosError } from "axios";
import Loading from "../utils/Loading";
import { Message } from "../../slicer/authSlice";


export interface User {
    createdAt:string,
    email:string,
    fullName:string,
    phoneNumber: string,
    shipping: string[],
    tandc: boolean,
    status:string,
    state:string,
    updatedAt:string,
    _id: string
}

export interface AllUsers {
    data:User[],
    totalUsers:number
}


const Admins = () =>{

    const { data, isError, isLoading, isSuccess, error } = users.useGetAdmins()

    const allUsers = data as AllUsers
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
                                    <h3 className="text-2xl font-bold">Admins</h3>
                                </div>
                                {isSuccess &&
                                <div>

                                    <div className="bg-white hidden md:flex justify-between p-2 rounded my-2">
                                        <div className="basis-1/4">user</div>
                                        <div className="basis-1/4">id</div>
                                        <div className="basis-1/4">email</div>
                                        <div className="basis-1/4">Registed</div>
                                        <div className="basis-1/4">action</div>
                                    </div>
                                    {
                                        allUsers.data.map((user:User)=>(

                                            <div key={user._id} className="bg-white md:flex justify-around p-2 rounded my-2">
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">user: </div> <div className="basis-3/4">{user.fullName}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">id: </div> <div className="basis-3/4">{user._id.slice(-3)}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">email: </div> <div className="basis-3/4">{user.email}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">Registed: </div> <div className="basis-3/4">{user.createdAt.slice(0,10)}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">action: </div> <div className="basis-3/4"><Link className="text-lime-500" to={`admindetails/${user._id}`}>view</Link></div></div>
                                            </div>

                                        ))
                                    }
                            
                                </div>
                                }
                            </div>
                    </section>
             
        </>
    )
}

export default Admins