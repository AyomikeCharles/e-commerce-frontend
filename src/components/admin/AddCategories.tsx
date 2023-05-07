import { Formik, Form } from "formik"
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
import validateImage from "../../res/validateImage"
import Botton from "../utils/Botton"

export interface InitValue {
    [key: string]: string | File
}
const AddCategories = () =>{

    const [spinner, setSpinner] = useState(false)

    const initValue: InitValue = {
        icon:'',
        title:'',
        description:''
    }


    


    const catMutation = useMutation({
        mutationFn:(info:FormData) =>{
            return categories.setCategories(info)
        }
    })

    const err = catMutation.error as AxiosError;
    


    useEffect(()=>{

       
        let errMessage = err?.response?.data as Message

        if(catMutation.isLoading){
            setSpinner(true)
        }

        if(catMutation.isSuccess){
            toast(catMutation.data.message)
            setSpinner(false)
        }
        

        if(catMutation.isError){
            if(errMessage){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[catMutation.isSuccess, catMutation.data, catMutation.isError, err, catMutation.isLoading])

    
    
   
    return(
        <>
            
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Add Categories</h3>
        
                                </div>
                                <div>

                                    <div className="md:w-8/12 mx-auto">

                                        <Formik
                                            initialValues={initValue}
                                            validationSchema={Yup.object({
                                                icon:Yup.mixed<File>().test("fileSize", "file cannot be more than 2mb and only the following extention are allowed 'png', 'jpeg', 'jpg', 'gif', 'svg'", files=> validateImage(files as File)).required(),
                                                title:Yup.string().required(),
                                                description:Yup.string().required()

                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm})=>{
                                
                                                    const  formData = new FormData();
                                                    for (const key in values) {
                                                      if (values.hasOwnProperty(key)) {
                                                        // if (values[key] instanceof File) {
                                                        //     formData.append(key, values[key], values[key].name);
                                                        //   } else {
                                                            formData.append(key, values[key])
                                                        //   }
                                                      }
                                                    }
                                                    catMutation.mutate(formData)
                                                    setSubmitting(false)
                                                    resetForm({values:{icon:'', title:'', description:''}})
                                        
                                            }}
                                        >
                                            <Form>

                                                <div className="my-3">
                                                    <MyFile
                                                        label="Icon:"
                                                        id="icon"
                                                        name="icon"
                                                        multiple={false}
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

                                                <div className="flex justify-start">
                                                    <Botton value="Submit" spinner={spinner}/>
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

export default AddCategories