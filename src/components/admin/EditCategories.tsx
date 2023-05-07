import { Formik, Form } from "formik"
import { useParams } from "react-router-dom"
import * as Yup from 'yup'
import MyTextInput from "../utils/inputField/MyInput"
import MyTextarea from "../utils/inputField/MyTextarea"
import { useMutation } from "react-query"
import categories from "../../res/categoriesService"
import MyFile from "../utils/inputField/MyFile"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { AxiosError } from "axios"
import { Message } from "../../slicer/authSlice"
import { InitValue } from "./AddCategories"
// import validateImage from "../../res/validateImage"
import { Cats } from "../utils/Hero"
import Loading from "../utils/Loading"
import Botton from "../utils/Botton"


const EditCategories = () =>{

    let  catId = useParams();
    let Id = catId.id as string;
    // const navigate = useNavigate()
    const [spinner, setSpinner] = useState(false)


    const {
        data,
        isError,
        isLoading,
        error,
        isSuccess
    } = categories.useGetOneCategory(Id)

    const category = data as Cats
    const err = error as AxiosError;
    let errMessage = err?.response?.data as Message

       

    const initValue: InitValue = {
        icon:category?.icon,
        title:category?.title,
        description:category?.description
    }


    const catMutation = useMutation({
        mutationFn:(info:FormData) =>{
            return categories.editCategories(Id, info)
        }
    })

    const mErr = catMutation.error as AxiosError;
    


    useEffect(()=>{

      
        let errMMessage = mErr?.response?.data as Message

        if(catMutation.isSuccess){
            setSpinner(false)
            toast(catMutation.data.message)
        }

        if(catMutation.isLoading){
            setSpinner(true)
        }

        if(catMutation.isError){
            if(errMMessage){
                toast(errMMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[catMutation.isSuccess, catMutation.data, catMutation.isLoading, catMutation.isError, mErr, Id])

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
                                    <h3 className="text-2xl font-bold">Edit Categories</h3>
        
                                </div>

                                {isSuccess && 
                                <div>

                                    <div className="md:w-8/12 mx-auto">

                                        <Formik
                                        initialValues={initValue}
                                        validationSchema={Yup.object({
                                            // icon:Yup.mixed<File>().test("fileSize", "file cannot be more than 2mb and only the following extention are allowed 'png', 'jpeg', 'jpg', 'gif', 'svg'", files=> validateImage(files as File)),
                                            title:Yup.string().required(),
                                            description:Yup.string().required()

                                        })}
                                        onSubmit={(values, {setSubmitting})=>{
                                    
                                            const  formData = new FormData();
                                                    for (const key in values) {
                                                      if (values.hasOwnProperty(key)) {
                                                            formData.append(key, values[key])
                                                        
                                                      }
                                                    }
                                                    catMutation.mutate(formData)
                                                    setSubmitting(false)
                                        }}>

                                         
                                            <Form>
                                                <div className="my-3 flex">
                                                    <img src={category.icon} alt="..." width={50} height={50}/>
                                                    <MyFile
                                                        label=""
                                                        id="icon"
                                                        name="icon"
                                                        multiple = {false}
                                                    />
                                                </div>
                                                

                                                <div className="my-3">
                                                    <MyTextInput
                                                        label="Title:"
                                                        id="title"
                                                        name="title"
                                                        type="text"
                                                    />
                                                </div>

                                                <div className="my-3">
                                                    <MyTextarea
                                                        label="Description:"
                                                        id="description:"
                                                        name="description"
                                                    >
                                                        
                                                    </MyTextarea>
                                                </div>

                                                <Botton
                                                    spinner={spinner}
                                                    value="Submit"
                                                />

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

export default EditCategories