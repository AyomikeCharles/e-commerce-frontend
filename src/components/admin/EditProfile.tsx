import { Formik, Form } from "formik"
import MyTextInput from "../utils/inputField/MyInput"
import * as Yup from "yup"
import users from "../../res/userService"
import { useMutation } from "react-query"
import { AxiosError } from "axios"
import { useEffect, useState } from 'react'
import { Message } from "../../slicer/authSlice"
import { ToastContainer, toast } from "react-toastify"
import Botton from "../utils/Botton"
import Loading from "../utils/Loading"


const EditProfile = () => {


    const [spinner, setSpinner] = useState(false)
    const { data, isError, isLoading, isSuccess, error } = users.useGetUser()
    const err1 = error as AxiosError;
    let errMessage = err1?.response?.data as Message



    const editMutation = useMutation({
        mutationFn:(info:object) =>{
            return users.editUser(info)
        }
    })

    const err = editMutation.error as AxiosError;
    

    useEffect(()=>{

        let errMessage = err?.response?.data as Message


        if(editMutation.isLoading){
            setSpinner(true)
        }


        if(editMutation.isSuccess){
            toast('success')
            setSpinner(false)
        }

        if(editMutation.isError){
            if(errMessage){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)

        }

    },[editMutation.isSuccess, editMutation.data, editMutation.isError, editMutation.isLoading, err])

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
                                    <h3 className="text-2xl font-bold">Edit Profile</h3>
                                    
                                </div>
                                <div>

                                {isSuccess &&

                                <div className="md:w-8/12 mx-auto">

                                    <Formik
                                        initialValues={{
                                            name:data?.fullName,
                                            phoneNumber:data?.phoneNumber,
                                        }}
                                        validationSchema={Yup.object({
                                            name:Yup.string().required(),
                                            phoneNumber:Yup.string().required(),
                                        })}

                                        onSubmit={(values, { setSubmitting })=>{
                                        
                                            editMutation.mutate(values)
                                            setSubmitting(false)
                                        }}
                                    >

                                        <Form>
                                            <div className="my-3">

                                                <MyTextInput
                                                label="Name:"
                                                name="name"
                                                id="name"
                                                type="text"
                                                />
                                            </div>

                                          

                                            <div className="my-3">

                                                <MyTextInput
                                                label="Phone Number:"
                                                name="phoneNumber"
                                                id="phoneNumber"
                                                type="text"
                                                />
                                            </div>
                                            
                                            <div className="flex justify-start">
                                                <Botton spinner={spinner} value="Submit"/>
                                            </div>
                                        </Form>
                                    </Formik>
                                    
                                </div>

                                }
                                </div>
                            </div>
                    </section>
                    <ToastContainer/>
   
        </>
    )
}

export default EditProfile;