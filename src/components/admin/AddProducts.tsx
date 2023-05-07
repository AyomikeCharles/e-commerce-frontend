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
import MySelect from "../utils/inputField/MySelect"
import { Cats } from "../utils/Hero"
import products from "../../res/productService"
import Botton from "../utils/Botton"
import Loading from "../utils/Loading"

export interface Data {
    [key: string]: string | FileList
    title: string,
    description: string,
    price: string,
    discountPercentage: string,
    rating:string
    stock: string,
    brand:string,
    category: string,
    images:FileList | string,
  }

const AddProducts = () =>{

    const initProduct : Data =  {
        title: '',
        description: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand:'',
        category: '',
        images:'',
      }

        const {
            data,
            isError,
            isLoading,
            isSuccess,
            error
        } = categories.useGetCategories()
    
        const [spinner, setSpinner] = useState(false)
        const cAtegories = data as Cats[]
        const err = error as AxiosError;
        let errMessage = err?.response?.data as Message
        
   


            const proMutation = useMutation({
                mutationFn:(info:FormData) =>{
                    return products.setProduct(info)
                }
            })
        
            const proErr = proMutation.error as AxiosError;
            
        
        
            useEffect(()=>{

                
        
                let proErrMessage = proErr?.response?.data as Message  
                
                if(proMutation.isLoading){
                    setSpinner(true)
                }
        
                if(proMutation.isError){
                    if(proErrMessage){
                        toast(proErrMessage.message)
                    }else{
                        toast('Network Error')
                    }
                    setSpinner(false)
                }

                if(proMutation.isSuccess){
                    if(proMutation.data.message === 'Unexpected field'){
                        toast('only 4 images are allowed')
                    }else if(proMutation.data.message === 'File too large'){
                        toast('all images should be less than 2mb')
                    }else{
                        toast(proMutation.data.message)
                    }
                    //navigate to products
                    setSpinner(false)
                }
        
            },[proMutation.isSuccess, proMutation.data, proMutation.isError, proErr, proMutation.isLoading])

            if(isLoading){
                return <Loading/>
            }
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
                                    <h3 className="text-2xl font-bold">Add Products</h3>
        
                                </div>
                                

                               
                                <div>

                                    <div className="md:w-8/12 mx-auto">

                                        <Formik 
                                            initialValues={initProduct}
                                            validationSchema={Yup.object({
                                                title:Yup.string().required(),
                                                description:Yup.string().required(),
                                                price:Yup.number().required(),
                                                discountPercentage:Yup.number().required(),
                                                rating:Yup.number().required(),
                                                stock:Yup.number().required(),
                                                brand:Yup.string().required(),
                                                category:Yup.string().required(),
                                            })}
                                            onSubmit={(values, {setSubmitting, resetForm})=>{
                                                const  formData = new FormData();
                                               

                                                Object.entries(values).forEach(([key, value]) => {
                                                    if (key === "images") {
                                                      for (let i = 0; i < value.length; i++) {
                                                        formData.append(key, value[i]);
                                                      }
                                                    } else {
                                                      formData.append(key, String(value));
                                                    }
                                                  });
                                                    proMutation.mutate(formData)
                                                    setSubmitting(false)
                                                    // resetForm({values:{icon:'', title:'', description:''}})
                                            }}
                                        >
                                            <Form>

                                                
                                                    <div className="my-3 px-1">
                                                        <MyFile
                                                            label="Thumbnail:"
                                                            id="thumbnail"
                                                            name="images"
                                                            multiple = {true}
                                                            />
                                                    </div>
                                                
                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Title:"
                                                            type="text"
                                                            id="title"
                                                            name="title"
                                                        />
                                                    </div>

                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Price:"
                                                            type="number"
                                                            id="price"
                                                            name="price"
                                                        />
                                                    </div>

                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Percentage Discount:"
                                                            type="number"
                                                            id="percentageDiscount"
                                                            name="discountPercentage"
                                                        />
                                                    </div>

                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Stock:"
                                                            type="number"
                                                            id="stock"
                                                            name="stock"
                                                        />
                                                    </div>

                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Rating:"
                                                            type="number"
                                                            id="rating"
                                                            name="rating"
                                                        />
                                                    </div>


                                                    <div className="my-3">
                                                        <MyTextInput
                                                            label="Brand:"
                                                            type="text"
                                                            id="brand"
                                                            name="brand"
                                                        />
                                                    </div>


                                                    <div className="my-3">
                                                        <MySelect
                                                        label="Category:"
                                                        name="category"
                                                        id="category"
                                                        >
                                                            <option>select</option>

                                                            {isSuccess &&
                                                            
                                                                cAtegories?.map((cats:Cats, i:number)=>(
                                                                    <option key={cats._id} value={cats._id}>{cats.title}</option>
                                                                    
                                                                ))
                                                            }
                                                        </MySelect>
                                                    </div>
                                                    <div className="my-3">
                                                        <MyTextarea
                                                            name="description"
                                                            label="Description:"
                                                            id="description"
                                                        >

                                                        </MyTextarea>
                                                    </div>

                                                    <div className="flex justify-start">
                                                        <Botton
                                                        spinner={spinner}
                                                        value="Submit"
                                                        />
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

export default AddProducts