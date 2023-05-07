import { Link, useParams } from "react-router-dom"
import { AxiosError } from "axios";
import users from "../../res/userService"
import { User } from "./Users";
import { useMutation } from "react-query"
import { ToastContainer, toast } from "react-toastify";
import { Message } from "../../slicer/authSlice";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import roles from "../../res/roles";
import Loading from "../utils/Loading";
import Spinner from "../utils/Spinner";


const AdminDetails = () => {

    const [portalState, setPortalState] = useState<boolean>(false)
    const [adminPortalState, setAdminPortalState] = useState<boolean>(false)
    const [spinner, setSpinner] = useState(false)
    const params = useParams()
    const id = params.id
    const { data, isError, isLoading, isSuccess, error, refetch } = users.useGetOneAdmin(id as string)



    const blockUser = useMutation({
        mutationFn:(info:string) =>{
            return users.blockUser(id as string, info)
        },
        onSuccess: data =>{
            refetch()
        }
    })

    const buErr = blockUser.error as AxiosError;
    const user = data as User
   
    
    useEffect(()=>{

        if(blockUser.isLoading){
            setSpinner(true)
        }

        let buMessage = buErr?.response?.data as Message

        if(blockUser.isSuccess){
            setSpinner(false)
            toast(blockUser.data.message)
        }

        

        if(blockUser.isError){
            if(buMessage){
                toast(buMessage.message)
            }else{
                toast('Network Error')
            }

            setSpinner(false)
            
        }

    },[blockUser.isSuccess, blockUser.data, blockUser.isError, buErr, blockUser.isLoading])




    const changeRole = useMutation({
        mutationFn:(info:string) =>{
            return users.changeRole(id as string, info)
        },
        onSuccess:data=>{
            refetch()
        }
    })


    const crErr = changeRole.error as AxiosError;

    useEffect(()=>{

        if(changeRole.isLoading){
            setSpinner(true)
        }

        let crMessage = crErr?.response?.data as Message

        if(changeRole.isSuccess){
            toast(changeRole.data.message)
            setSpinner(false)
        }

        

        if(changeRole.isError){
            if(crMessage){
                toast(crMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[changeRole.isSuccess, changeRole.data, changeRole.isError, crErr, changeRole.isLoading])
   
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message
    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }
    
    
  

    const openBlockPortal = () => {
        setPortalState(!portalState)
    }

    const openAdminPortal = () => {
        setAdminPortalState(!adminPortalState)
    }


    return(
        <>
           
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">{user.fullName} Details</h3>
                                    
                                </div>
                                {isSuccess &&

                                <div>

                                    <div className="md:flex">
                                      
                                        <div className="basis-2/4 md:p-5 content-center">
                                            <h3 className="font-bold text-2xl md:mb-3">{user.fullName}</h3>
                                            <h5>#{user._id.slice(-3)}</h5>
                                        </div>
                                        <div className="basis-1/4 flex justify-end my-3">
                                            <div>
                                                <button className="hover:bg-lime-700 h-9 mx-2 bg-lime-500 p-2 rounded" onClick={openAdminPortal}>{user.role === roles.users? 'Make Admin' : 'Make Basic'}</button>
                                                
                                            </div>
                                            <div>
                                                <button className="hover:bg-lime-700 h-9 mx-2 bg-lime-500 p-2 rounded" onClick={openBlockPortal}>{user?.status === 'unblock'?'block':'unblock'}</button>
                                                
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 rounded p-3 my-3">
                                        <h3 className="font-bold text-1xl mb-3">Pesonal Details</h3>
                                        <div>
                                            {user.email}
                                        </div>
                                        <div>
                                            {user.phoneNumber}
                                        </div>
                                    </div>

                                    <div className="bg-slate-100 rounded p-3 my-3">
                                        <h3 className="font-bold text-1xl mb-3">Shipping Details</h3>
                                        <div>
                                           {
                                            user.shipping.map((address, i)=>(
                                                <div key={i}>{address}</div>
                                            ))
                                           }
                                        </div>
                                    </div>
                                    
                                </div>
                                }
                            </div>
                    </section>
                    <ToastContainer/>
                    {portalState && createPortal(
                        <div className="fixed top-0 left-0 z-50 bg-black/30 w-full h-full pt-32">
                        <div className="flex justify-center">
                            <div className="bg-white  rounded">
                                <div className="bg-lime-200 rounded-t py-3 text-lg px-2">{user?.status === 'unblock'?'Block':'Unblock'} User?</div>
                                <p className="py-4 border-b px-2">are you sure you want to {user?.status === 'unblock'?'block':'unblock'} this user</p>
                                <div className="flex justify-end py-2 px-3">

                                    {user?.status === 'unblock'? <button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>blockUser.mutate('block')}> {spinner ? <Spinner/> : null} block</button>: <button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>blockUser.mutate('unblock')}> {spinner ? <Spinner/> : null} unblock</button>}  
                                    
                                    <button className="mt-3 ml-1 bg-gray-200 px-2 py-1 rounded " onClick={openBlockPortal} > cancel </button>
                                </div>
                            </div>
                        </div>
                        </div>, document.body
                    )}



                    {adminPortalState && createPortal(
                       
                        <div className="fixed top-0 left-0 z-50 bg-black/30 w-full h-full pt-32">
                            <div className="flex justify-center">
                                <div className="bg-white  rounded">
                                    <div className="bg-lime-200 rounded-t py-3 text-lg px-2">Make {user.role === roles.users ? 'Admin' : 'Basic'}?</div>
                                    <p className="py-4 border-b px-2">are you sure you want to make this user {user.role === roles.users ? 'admin' : 'basic'}</p>
                                    <div className="flex justify-end py-2 px-3">

                                        {user.role === roles.users ? <button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>changeRole.mutate(roles.admin)}> {spinner ? <Spinner/> : null} make admin </button>:<button className="mt-3 mr-1 bg-lime-500 px-2 py-1 rounded inline-flex text-white" onClick={()=>changeRole.mutate(roles.users)}> {spinner ? <Spinner/> : null} make basic </button>}
                                    
                                        <button className="mt-3 ml-1 bg-gray-200 px-2 py-1 rounded " onClick={openAdminPortal} > cancel </button>

                                     
                                    </div>
                                </div>
                            </div>
                            </div>, document.body
                    )}
            
            
        </>
    )
}


export default AdminDetails;