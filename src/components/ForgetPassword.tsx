import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { useEffect, useState } from 'react'
import { useMutation } from "react-query"
import users from "../res/userService"
import { ToastContainer, toast } from "react-toastify"
import { Formik, Form } from "formik"
import MyTextInput from "./utils/inputField/MyInput"
import * as Yup from 'yup'
import Botton from "./utils/Botton"
import { AxiosError } from "axios"
import { Message } from "../slicer/authSlice"

const ForgetPassword = ():JSX.Element=>{

    const [spinner, setSpinner] = useState(false)

    const fpMutation = useMutation({
        mutationFn:(info:object) =>{
            return users.forgetpassword(info)
        }
    })

    useEffect(() => {
      if(fpMutation.isLoading){
        setSpinner(true)
      }

      if(fpMutation.isSuccess){
        toast(fpMutation.data.message)
        setSpinner(false)

      }

    const err = fpMutation.error as AxiosError
    let    errMessage = err?.response?.data as Message


      if(fpMutation.isError){
        if(errMessage?.message){
            toast(errMessage?.message)
        }else{
            toast('Network Error')
        }
        setSpinner(false)

      }
      
    },[fpMutation.isError, fpMutation.isLoading, fpMutation.isSuccess, fpMutation.data, fpMutation.error])


    
    return(
        <>
            <Navbar/>

            <section className="py-24">
                <Formik
                    initialValues={{email:''}}
                    validationSchema={Yup.object({
                        email:Yup.string().required()
                    })}
                    onSubmit={(value, {setSubmitting, resetForm})=>{
                        fpMutation.mutate(value)
                        setSubmitting(false)
                        resetForm({values:{email:''}})
                    }}
                >
                    <Form>
                        <div className="px-5 md:w-[40%] mx-auto">
                        <div className="o">
                            <MyTextInput
                                label="Email:"
                                name="email"
                                type="email"
                                id="email"
                            />
                        </div>

                        <div className="flex justify-start">
                        <Botton
                            spinner={spinner}
                            value="Submit"
                            />
                        </div>
                        </div>
                    </Form>
                </Formik>
            </section>

            
            
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default ForgetPassword