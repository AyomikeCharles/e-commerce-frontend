import { Link } from "react-router-dom";
import shopping from './utils/images/shopping.jpg';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "./utils/inputField/MyInput";
import { useAppDispatch, useAppSelector } from "..";
import { useNavigate } from "react-router-dom";
import { reset, login } from "../slicer/authSlice";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botton from "./utils/Botton";

export interface FormDataLogin {
    email:string,
    password:string
}
const Login = () => {

const naigate = useNavigate()
const dispatch = useAppDispatch()
const [spinner, setSpinner] = useState(false)

 const formData: FormDataLogin = {
    email:'',
    password:''
}
 
 const { user, isLoading, isError, isSuccess, message } = useAppSelector(state => state.authUser)

useEffect(()=>{

    if(isError){
        if(typeof message === 'object'){
            toast(message?.message)
            setSpinner(false)
        }
    }

    if(isLoading){
        setSpinner(true)
    }

    if(isSuccess || user){
        naigate('/user')
        setSpinner(false)
    }

    dispatch(reset())

}, [user, isError, isLoading, isSuccess, message, naigate, dispatch])


    

    return(
        <>
        <section className="">
            <div className="md:flex">
                <div className="basis-1/2 py-16">
                    <Formik 
                        initialValues={formData}
                        validationSchema={Yup.object({
                            email:Yup.string().email().required(),
                            password:Yup.string().required()
                        })}
                        onSubmit={(values, {setSubmitting})=>{
                            setTimeout(()=>{
                                dispatch(login(values))
                                setSubmitting(false)
                            }, 400)
                        }}
                        >
                        <Form>
                            <div className="w-10/12 md:w-8/12 mx-auto ">
                                <h3 className="font-bold text-2xl my-3"> Welcome Back </h3>
                                <p className="mt-3 mb-6">Sign into your account here</p>

                                <div className="my-3">
                                    <MyTextInput
                                        label="Email:"
                                        id="email"
                                        type="text"
                                        name="email"
                                    />
                                </div>

                                <div className="my-3">
                                    <MyTextInput
                                        label="Password:"
                                        id="password"
                                        type="password"
                                        name="password"
                                    />
                                    
                                </div>
                                <div className="text-right mt-5">
                                    <Link to="/forgetpassword" className="hover:text-lime-500 transition duration-500">Forget password?</Link>
                                </div>
                                <div className="flex justify-start">
                                    <Botton
                                        spinner={spinner}
                                        value="Sign In"
                                    />
                                </div>
                                
                            </div>
                        </Form>
                    </Formik>
                    <div className="w-8/12 mt-5 mx-auto text-center">
                        not a member? <Link to="/signup" className="hover:text-lime-500 transition duration-500"> Sign up</Link>
                    </div>
                </div>
                <div style={{backgroundImage:`url(${shopping})`}} className="basis-1/2 relative bg-no-repeat bg-cover bg-center">
                    <div className=" h-full w-full pb-10 pt-[30%]">
                            <div className="text-center">
                                <h4 className="text-2xl font-bold">Get Access to your Order, wishlist and lots more.</h4>
                                <h4 className="text-1xl font-bold mb-6">Become a member</h4>
                                <div><Link to='/signup' className="bg-lime-500 p-3 rounded text-white">Join Here</Link></div>
                            </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <ToastContainer/>
        </>
    )
}

export default Login;