import Navbar from "./utils/Navbar";
import Footer from "./utils/Footer";
import { Link } from "react-router-dom";
import shopping from './utils/images/shopping.jpg';
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "./utils/inputField/MyInput";
import MyTel from "./utils/inputField/MyTel";
import MyCheckbox from "./utils/inputField/MyCheckbox";
import { useAppDispatch, useAppSelector } from "..";
import { useNavigate } from "react-router-dom";
import { reset, signup } from "../slicer/authSlice";
import { useEffect, useState  } from "react";
import { ToastContainer, toast } from "react-toastify";
import Botton from "./utils/Botton";



export interface FormData  {
    fullName:string,
    email:string,
    password:string,
    phoneNumber:string,
    whatsapp:string,
    tandc:boolean
}

const SignUp = () => {

    const formData: FormData = {
        fullName:'',
        email:'',
        phoneNumber:'',
        password:'',
        whatsapp:'',
        tandc:false
    }

 const naigate = useNavigate()
 const dispatch = useAppDispatch()
const [spinner, setSpinner] = useState(false)

 
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
        <Navbar/>
        <section className="">
            <div className="md:flex">
                <div className="basis-1/2 py-16">


                <Formik
                    initialValues={formData}
                    validationSchema={Yup.object({
                        fullName:Yup.string().required(),
                        email:Yup.string().email('invalide email address').required(),
                        phoneNumber:Yup.string().required(),
                        password:Yup.string().required(),
                        tandc:Yup.boolean().oneOf([true], 'please check term and condition'),
                        whatsapp:Yup.string(),

                    })}
                    onSubmit={(values, { setSubmitting })=>{
                        setTimeout(()=>{
                            dispatch(signup(values))
                            setSubmitting(false)
                        }, 400)
                    }}
                    >
               

                        
                    <Form>
                        <div className="w-10/12 md:w-8/12 mx-auto">
                            <h3 className="font-bold text-2xl my-3">! Welcome </h3>
                            <p className="mt-3 mb-6">Create New Customer Account</p>
                            <div className="my-3">
                                <MyTextInput
                                    label="Full Name:"
                                    id="fullName" 
                                    name='fullName'
                                    type="text"
                                />
                            </div>
                            <div className="my-3">
                                <MyTextInput
                                    label="Email Address:"
                                    id="email" 
                                    name='email'
                                    type="text"
                                />
                            </div>

                            <div className="my-3">
                                <MyTel
                                    label="Phone Number:"
                                    id="phoneNumber" 
                                    name='phoneNumber'
                                    type="tel"
                                />
                            </div>

                            <div className="my-3">
                                <MyTextInput
                                    label="Password:"
                                    id="password" 
                                    name='password'
                                    type="password"
                                />
                            </div>


                            <div className="my-3">
                                <MyTel
                                    label="Whatsapp Number:"
                                    id="whatsapp" 
                                    name='whatsapp'
                                    type="tel"
                                />
                            </div>

                            <MyCheckbox
                                id="tandc" 
                                name='tandc'
                            >
                                i agree to the <Link className="text-lime-500 hover:text-lime-700 transition duration-500" to=''>terms and condition</Link>
                            </MyCheckbox>
                             


                            <div className="flex justify-center">
                                <Botton
                                    spinner={spinner}
                                    value="Sign Up"
                                />
                            </div>
                        </div>
                    </Form>
                    </Formik>

                    
                    <div className="w-8/12 mt-5 mx-auto text-center">
                        Already a member? <Link to="/login" className="hover:text-lime-500 transition duration-500"> Sign in</Link>
                    </div>
                </div>
                <div style={{backgroundImage:`url(${shopping})`}} className="basis-1/2 relative bg-no-repeat bg-cover bg-center">
                    <div className=" bg-lime-500/50 h-full w-full pb-10 pt-[30%] md:pt-[50%]">
                            <div className="text-center">
                                <h4 className="text-2xl font-bold">Get Access to your Order, wishlist and lots more.</h4>
                                <h4 className="text-1xl font-bold mb-6">Already a member</h4>
                                <div><Link to='/login' className="bg-lime-800 p-3 rounded text-white">Login Here</Link></div>
                            </div>
                    </div>
                    
                </div>
            </div>
        </section>
        <Footer/>
        <ToastContainer/>
        </>
    )
}

export default SignUp;