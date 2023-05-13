import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useMutation } from "react-query"
import users from "../res/userService"
import { ToastContainer, toast } from "react-toastify"
import { Formik, Form } from "formik"
import MyTextInput from "./utils/inputField/MyInput"
import * as Yup from 'yup'
import Botton from "./utils/Botton"

const NewPassword = ():JSX.Element=>{

    let  params = useParams();
    let Id = params.fpcode as string;

    const [spinner, setSpinner] = useState(false)

    const fpMutation = useMutation({
        mutationFn:(info:object) =>{
            return users.changepassword(info)
        }
    })

    useEffect(() => {
      if(fpMutation.isLoading){
        setSpinner(true)
      }

      if(fpMutation.isSuccess){
        setSpinner(false)
        toast(fpMutation.data.message)
      }

      if(fpMutation.isError){
        setSpinner(false)
        toast('there was an error, kindly try again')
      }
      
    },[fpMutation.isError, fpMutation.isLoading, fpMutation.isSuccess, fpMutation.data])


    
    return(
        <>
            <Navbar/>

            <section className="py-24">
                <Formik
                    initialValues={{newpassword:'', code:Id, cnpassword:''}}
                    validationSchema={Yup.object({
                        newpassword:Yup.string().required(),
                        cnpassword:Yup.string().required()
                    })}
                    onSubmit={(value, {setSubmitting, resetForm})=>{
                        fpMutation.mutate(value)
                        setSubmitting(false)
                        resetForm({values:{newpassword:'', code:Id, cnpassword:''}})
                    }}
                >
                    <Form>
                        <div className="w-10/12 md:w-7/12 lg:w-4/12 mx-auto">
                            <div className="my-3">
                                <MyTextInput
                                    label="New Password:"
                                    name="newpassword"
                                    type="password"
                                    id="newpassword"
                                />
                            </div>
                            <div className="my-3">
                            <MyTextInput
                                label="Confirm New Password:"
                                name="cnpassword"
                                type="password"
                                id="cnpassword"
                            />
                            </div>

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

export default NewPassword