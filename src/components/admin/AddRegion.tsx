import { Formik, Form } from "formik"
import * as Yup from 'yup'
import MyTextInput from "../utils/inputField/MyInput"
import { useMutation } from "react-query"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import { AxiosError } from "axios"
import { Message } from "../../slicer/authSlice"
import region from "../../res/stateService"
import MySelect from "../utils/inputField/MySelect"
import Botton from "../utils/Botton"

export interface InitValue {
    [key: string]: string | number
}
const AddRegion = () =>{

    const [spinner, setSpinner] = useState(false)

    const initValue: InitValue = {
        state:'',
        price:0,
        region:''
    }


    


    const stateMutation = useMutation({
        mutationFn:(info:object) =>{
            return region.setState(info)
        }
    })

    const err = stateMutation.error as AxiosError;
    


    useEffect(()=>{

        let  errMessage = err?.response?.data as Message

        if(stateMutation.isLoading){
            setSpinner(true)
        }

        if(stateMutation.isSuccess){
            toast(stateMutation.data.message)
            setSpinner(false)
            console.log(stateMutation.data)
        }


        if(stateMutation.isError){
            if(errMessage){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[stateMutation.isSuccess, stateMutation.data, stateMutation.isError, err, stateMutation.isLoading])

    
    
   
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
                                              
                                                state:Yup.string().required(),
                                                price:Yup.number().required(),
                                                region:Yup.string().required()

                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm})=>{
                                                    stateMutation.mutate(values)
                                                    setSubmitting(false)
                                                    resetForm({values:{state:'', price:'', region:''}})
                                        
                                            }}
                                        >
                                            <Form>

                            
                                                

                                                <div className="my-3">
                                                    <MyTextInput
                                                        label="State:"
                                                        id="state"
                                                        name="state"
                                                        type="text"
                                                    />
                                                </div>


                                                <div className="my-3">
                                                    <MyTextInput
                                                        label="Price:"
                                                        id="price"
                                                        name="price"
                                                        type="number"
                                                    />
                                                </div>

                                                <div className="my-3">

                                                    <MySelect
                                                        name="region"
                                                        id="region"
                                                        label="Region:"
                                                    >
                                                        <option></option>
                                                        <option>South South</option>
                                                        <option>South East</option>
                                                        <option>South West</option>
                                                        <option>Middle Belt</option>
                                                        <option>North East</option>
                                                        <option>North West</option>
                                                        
                                                    </MySelect>
                                                    </div>
                                               

                                                <div>
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

export default AddRegion