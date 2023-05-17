import { useParams, Link } from "react-router-dom";
import { AxiosError } from "axios";
import { Message } from "../../slicer/authSlice";
import { ToastContainer, toast } from "react-toastify";
import region from "../../res/stateService";
import Loading from "../utils/Loading";
import { S } from "./Region";
import { Form, Formik } from "formik";
import * as Yup from 'yup'
import MyTextarea from "../utils/inputField/MyTextarea";
import { useMutation } from "react-query";
import { useEffect, useState } from "react";
import Botton from "../utils/Botton";



const RegionDetails = ():JSX.Element =>{

    let  catId = useParams();
    let Id = catId.id as string;
    const [showElga, setShowElga] = useState(false)
    const [spinner, setSpinner] = useState(false)
    const showEditLga = () => {
        setShowElga(!showElga)
    }

  

  
        const {
            data,
            isError,
            isSuccess,
            isLoading,
            error
        } = region.useGetOneState(Id)
        const info = data as S
        const err = error as AxiosError;

       
      
        


        const {
            data:lgaData,
            isError:islgaError,
            isLoading:islgaLoading,
            error:lgaError,
            isSuccess:lgaIsSuccess,
            refetch
        } = region.useGetLgaByState(Id)
        const erro = lgaError as AxiosError;
        

        const lgaMutation = useMutation({
            mutationFn:(val:object) =>{
                return region.setLga(val)
            }
        })

        const erro1 = lgaMutation.error as AxiosError;


        const lgaEMutation = useMutation({
            mutationFn:(val:object) =>{
                return region.editLga(lgaData?._id, val)
            },
            onSuccess:()=>{
                refetch()
            }
        })

        const erro2 = lgaEMutation.error as AxiosError;


        useEffect(()=>{

            let errMessage = erro1?.response?.data as Message
    
            if(lgaMutation.isSuccess){
                if(lgaMutation.data.message){
                    toast(lgaMutation.data.message)
                }else{
                    toast('LGAs has been added')
                }
                refetch()
                setSpinner(false)
            }

            if(lgaMutation.isLoading){
                setSpinner(true)
            }
    
    
            if(lgaMutation.isError){
                if(errMessage){
                    toast(errMessage.message)
                }else{
                    toast('Network Error')
                }
                setSpinner(false)
            }
    
        },[lgaMutation.isSuccess, lgaMutation.data, lgaMutation.isError, erro1, lgaMutation.isLoading, refetch])






        useEffect(()=>{

            let errMessage = erro2?.response?.data as Message

            if(lgaEMutation.isLoading){
                setSpinner(true)
            }
    
            if(lgaEMutation.isSuccess){
                toast(lgaEMutation.data.message)
                setSpinner(false)
            }
    
            
    
            if(lgaEMutation.isError){
                if(errMessage){
                    toast(errMessage.message)
                }else{
                    toast('Network Error')
                }
                setSpinner(false)
            }
    
        },[lgaEMutation.isSuccess, lgaEMutation.data, lgaEMutation.isError, lgaEMutation.isLoading, erro2])



        let errMessage = err?.response?.data as Message
        let errLgaMessage = erro?.response?.data as Message
        if(isLoading && islgaLoading)return<Loading/>

        if(isError){
            return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
        }
        if(isSuccess && data?.hasOwnProperty('stack') ){
            return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
        }

        if(islgaError){
            return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errLgaMessage ? errLgaMessage.message:'Network Error'}</div></div>
        }
        if(lgaIsSuccess && lgaData?.hasOwnProperty('stack') ){
            return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
        }

        
    
    return(
        <>
           
            <section id="content">
                {isSuccess &&
                <div className="px-5 py-10">
                    <div className="mb-12 flex justify-between">
                        <h3 className="text-2xl font-bold">State Details</h3>
                        <Link  to={`/admin/region/editregion/${info._id}`} className="text-lime-500 p-2 rounded mx-3 transition duration-500">
                                Edit States
                        </Link>
                    </div>
                
                    <div className="md:w-10/12 bg-white p-3 rounded mx-auto">
                        <div className="">
                    
                                
                            <div>
                               State: {info?.state}
                            </div>
                            <div>
                               Price: {info?.price}
                            </div>
                            <div>
                                Region: {info?.region}
                            </div>
                        </div>
                    </div> 

                

                <div className="mt-10 md:w-10/12 mx-auto">
                    <h3 className="text-xl font-bold">LGAs</h3>
                    <div className="bg-white p-3 rounded">
                        
                        {lgaIsSuccess && lgaData === null? 

                            <Formik
                            initialValues={{lgas:'', state:Id}}
                            validationSchema={Yup.object({
                                lgas:Yup.string().required()
                            })}
                            onSubmit={(values, {setSubmitting})=>{
                                lgaMutation.mutate(values)
                                setSubmitting(false)
                            }}
                            >
                            <Form>
                                <MyTextarea
                                    name="lgas"
                                    id="lgas"
                                    label="Add LGAs"
                                >
                                </MyTextarea>
                                <div className="flex justify-start">
                                    <Botton spinner={spinner} value="Submit"/>
                                </div>
                            </Form>
                            </Formik>
                        
                        
                        
                        : lgaIsSuccess && lgaData.hasOwnProperty('lgas') &&
                            <div>
                                {showElga ?
                                    <Formik
                                    initialValues={{lgas:lgaData?.lgas}}
                                    validationSchema={Yup.object({
                                        lgas:Yup.string().required()
                                    })}
                                    onSubmit={(values, {setSubmitting})=>{
                                        lgaEMutation.mutate(values)
                                        setSubmitting(false)
                                    }}
                                    >
                                    <Form>
                                        <MyTextarea
                                            name="lgas"
                                            id="lgas"
                                            label="Add LGAs"
                                        >
                                        </MyTextarea>
                                        <div className="flex">
                                            <Botton spinner={spinner} value="submit"/>
                                            <button className="bg-gray-500 mt-5 mx-3 p-2 rounded transition duration-500 text-white  hover:bg-gray-700" type="button" onClick={showEditLga}>cancel</button>
                                        </div>
                                    </Form>
                                    </Formik>
                                    : 
                                    <div>
                                        {lgaData?.lgas}
                                        <br/>

                                        <button className="bg-lime-500 my-3 p-2 rounded text-white transition duration-500 " onClick={showEditLga}>Edit lgas</button>

                                    </div>
                                }
                                
                            
                            </div>
                        }
                    
                    </div>
                </div>
                </div>      
                }
            </section>
           <ToastContainer/>
        </>
    )
}

export default RegionDetails
