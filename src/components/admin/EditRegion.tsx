import { Formik, Form } from "formik"
import * as Yup from 'yup'
import MyTextInput from "../utils/inputField/MyInput"
import { useMutation } from "react-query"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { AxiosError } from "axios"
import { Message } from "../../slicer/authSlice"
import region from "../../res/stateService"
import MySelect from "../utils/inputField/MySelect"
import { useParams } from "react-router-dom";
import { S } from "./Region"
import Loading from "../utils/Loading"
import Botton from "../utils/Botton"


const EditRegion = () =>{


    let  catId = useParams();
    let Id = catId.id as string;
    const [spinner, setSpinner] = useState(false)
 
  
        const {
            data,
            isError,
            isLoading,
            error,
            isSuccess
        } = region.useGetOneState(Id)
        const info = data as S



    


    const stateMutation = useMutation({
        mutationFn:(info:object) =>{
            return region.editState(Id, info)
        }
    })

    const err = stateMutation.error as AxiosError;
    


    useEffect(()=>{

        let errMessage = err?.response?.data as Message

        if(stateMutation.isLoading){
            setSpinner(true)
        }

        if(stateMutation.isSuccess){
            toast(stateMutation.data.message)
            setSpinner(false)
        }

        

        if(stateMutation.isError){
            if(errMessage){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[stateMutation.isSuccess, stateMutation.data, stateMutation.isError, stateMutation.isLoading, err])

    const err1 = error as AxiosError;
    let errMessage = err1?.response?.data as Message
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
                                    <h3 className="text-2xl font-bold">Add Categories</h3>
        
                                </div>
                                {isSuccess &&
                                <div>

                                    <div className="md:w-8/12 mx-auto">

                                        <Formik
                                            initialValues={{
                                                state:info.state,
                                                price:info.price,
                                                region:info.region
                                            }}
                                            validationSchema={Yup.object({
                                              
                                                state:Yup.string().required(),
                                                price:Yup.number().required(),
                                                region:Yup.string().required()

                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm})=>{
                                                    stateMutation.mutate(values)
                                                    setSubmitting(false)
                                        
                                            }}
                                        >
                                            <Form>

                            
                                                
                                                <div className="my-3">

                                                    <MyTextInput
                                                        label="State:"
                                                        id="state"
                                                        name="state"
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="my-3">

                                                    <MyTextInput
                                                        label="Price:"
                                                        id="price"
                                                        name="price"
                                                        type="number"
                                                    />
                                                </div>


                                                <div className="my-3">
                                                    <MySelect
                                                        name="region"
                                                        id="region"
                                                        label="Region:"
                                                    >
                                                        <option></option>
                                                        <option>South South</option>
                                                        <option>South East</option>
                                                        <option>South West</option>
                                                        <option>Middle Belt</option>
                                                        <option>North East</option>
                                                        <option>North West</option>
                                                        
                                                    </MySelect>
                                                </div>
                                               

                                                <div className="flex justify-start">
                                                    <Botton spinner={spinner} value="Submit"/>
                                                </div>

                                            </Form>
                                        </Formik>
                                    </div>
                                </div>
                                }
                            </div>
                    </section>
                    <ToastContainer/>
                
        </>
    )
}

export default EditRegion