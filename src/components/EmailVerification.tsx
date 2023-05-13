import Navbar from "./utils/Navbar"
import Footer from "./utils/Footer"
import { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useMutation } from "react-query"
import users from "../res/userService"
import { ToastContainer, toast } from "react-toastify"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import Botton from "./utils/Botton"
import MyText from "./utils/inputField/MyText"



const EmailVerification = ():JSX.Element=>{

    let  params = useParams();
    let verificationId = params.verificationId as string;

    const [spinner, setSpinner] = useState(false)

    const verifyMutation = useMutation({
        mutationFn:(info:object) =>{
            return users.verifyemail(info)
        }
    })

    useEffect(() => {
     
      if(verifyMutation.isLoading){
        setSpinner(true)
      }

      if(verifyMutation.isSuccess){
        toast(verifyMutation.data.message)
        setSpinner(false)
      }

      if(verifyMutation.isError){
        setSpinner(false)
        toast('unable to verify email, kindly try again')
      }
    },[verifyMutation.isLoading, verifyMutation.isError, verifyMutation.isSuccess, verifyMutation.data])


    
    return(
        <>
            <Navbar/>

            <section className="py-24">
                {verifyMutation.isSuccess && !verifyMutation?.data?.hasOwnProperty('stack') ?
                
                <div className="text-center my-10">
                    Email has been verified, login <Link to='/login'>here</Link>
                </div>
                :
                
                <Formik
                    initialValues={{vid:verificationId}}
                    validationSchema={Yup.object({
                        vid:Yup.string().required()
                    })}
                    onSubmit={(values, {setSubmitting})=>{
                        verifyMutation.mutate(values)
                        console.log(values)
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <div className="w-10/12 md:w-7/12 lg:w-4/12 mx-auto">

                            <MyText
                                readOnly={true}
                                name='vid'
                                id="vid"
                                type="text"
                                label="verification code"
                            />

                        </div>
                        <div>
                            <Botton value="Verify Email" spinner={spinner} />
                        </div>
                    </Form>
                </Formik>
                }
            </section>
            
            
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default EmailVerification