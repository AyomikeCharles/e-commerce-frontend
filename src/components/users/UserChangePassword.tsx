import { Formik, Form } from "formik";
import MyTextInput from "../utils/inputField/MyInput";
import * as Yup from 'yup'
import { useMutation } from "react-query";
import users from "../../res/userService";
import { AxiosError } from "axios";
import { Message } from "../../slicer/authSlice";
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import Botton from "../utils/Botton";

const UserChangePassword = () => {

    const [spinner, setSpinner] = useState(false)

    const cpMutation = useMutation({
        mutationFn:(info:object) =>{
            return users.changePassword(info)
        }
    })

    const err = cpMutation.error as AxiosError;


    useEffect(()=>{

    let errMessage = err?.response?.data as Message


        if(cpMutation.isLoading){
            setSpinner(true)
        }

        if(cpMutation.isSuccess){
            toast(cpMutation.data.message)
            setSpinner(false)
        }

        

        if(cpMutation.isError){
            if(err.response?.data){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[cpMutation.isSuccess, cpMutation.data, cpMutation.isError, cpMutation.isLoading, err])
    

    return(
        <>
         
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Change Password</h3>
                                    
                                </div>
                                <div>


                                <div className="md:w-8/12 mx-auto">
                                <Formik
                                    initialValues={{
                                        oldpassword:'',
                                        newpassword:'',
                                        cnpassword:''
                                    }}
                                    validationSchema={Yup.object({
                                        oldpassword:Yup.string().required(),
                                        newpassword:Yup.string().required(),
                                        cnpassword:Yup.string().required(),
                                    })}
                                    onSubmit={(values, { setSubmitting, resetForm })=>{

                                        cpMutation.mutate(values)
                                        resetForm({values:{
                                            oldpassword:'',
                                            newpassword:'',
                                            cnpassword:''
                                        }})
                                        setSubmitting(false)

                                    }}
                                >
                                        <Form>

                                            <div className="my-3">

                                                <MyTextInput
                                                    label="Old Password:"
                                                    name="oldpassword"
                                                    id="oldpassword"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="my-3">

                                                <MyTextInput
                                                    label="New Password:"
                                                    name="newpassword"
                                                    id="newpassword"
                                                    type="text"
                                                />
                                            </div>


                                            <div className="my-3">
                                                <MyTextInput
                                                    label="Confirm New Password:"
                                                    name="cnpassword"
                                                    id="cnpassword"
                                                    type="text"
                                                />
                                            </div>

                                            <div className="flex justify-start">
                                                <Botton spinner={spinner} value="Submit"/>

                                            </div>
                                            

                                        </Form>
                                    </Formik>
                                </div>

                                   
                                    

                                
                                </div>
                            </div>
                    </section>
                    <ToastContainer/>

        </>
    )
}

export default UserChangePassword;