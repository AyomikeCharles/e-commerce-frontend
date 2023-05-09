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
      }

      if(fpMutation.isError){
        toast('there was an error, kindly try again')
      }
      
    },[fpMutation.isError, fpMutation.isLoading, fpMutation.isSuccess, fpMutation.data])


    
    return(
        <>
            <Navbar/>

            <section className="py-24">
                <Formik
                    initialValues={{email:''}}
                    validationSchema={Yup.object({
                        email:Yup.string().required()
                    })}
                    onSubmit={(value, {setSubmitting})=>{
                        fpMutation.mutate(value)
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <div className="w-10/12 md:w-7/12 lg:w-4/12 mx-auto">
                            <MyTextInput
                                label="Email:"
                                name="email"
                                type="email"
                                id="email"
                            />
                        </div>

                        <Botton
                            spinner={spinner}
                            value="Submit"
                        />
                        
                    </Form>
                </Formik>
            </section>

            
            
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default ForgetPassword