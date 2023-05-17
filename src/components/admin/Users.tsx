
import { Link } from "react-router-dom"
import users from "../../res/userService";
import { AxiosError } from "axios";
import Loading from "../utils/Loading";
import { Message } from "../../slicer/authSlice";
import { useState } from 'react'
import Pagination from "../utils/Pagination"


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
    role:string
}

export interface AllUsers {
    data:User[],
    totalUsers:number
}


const Users = () =>{

    const [search, setSearch] = useState('')
    const [skip, setSkip] = useState(0)
    const [page, setPage] = useState(1)
    const limit : number = 50
    const { data, isError, isLoading, isSuccess, error } = users.useGetUsers(limit, skip, search)

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
                                    <h3 className="text-2xl font-bold">Users</h3>
                                </div>
                                {isSuccess &&
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
                                            className="shadow p-2 rounded-l focus:outline-none w-full bg-gray-50"  
                                            />
                                    </div>
                                </form>
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
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">email: </div> <div className="basis-3/4 truncate ...">{user.email}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">Registed: </div> <div className="basis-3/4">{user.createdAt.slice(0,10)}</div></div>
                                                <div className="basis-1/4 flex md:block"><div className="md:hidden basis-1/4">action: </div> <div className="basis-3/4"><Link className="text-lime-500" to={`userdetails/${user._id}`}>view</Link></div></div>
                                            </div>

                                        ))
                                    }
                                    
                                    
                                </div>
                                }
                                    <div className="flex justify-center my-10">
                                        <Pagination
                                            total={allUsers?.totalUsers}
                                            limit={limit}
                                            page={page}
                                            next={(val:number)=>next(val)}
                                        />
                                    </div>
                            </div>
                    </section>
             
        </>
    )
}

export default Users