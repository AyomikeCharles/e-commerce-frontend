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
import { useParams } from "react-router-dom"
import { Data } from "./AddProducts"
import Loading from "../utils/Loading"
import Botton from "../utils/Botton"

export interface initPro {
    [key: string]: string | File

  }

const EditProducts = () =>{


    let  productId = useParams();
    let id = productId.id;
    const [spinner, setSpinner] = useState(false)


    const {data, isLoading, error, isSuccess, isError} = products.useGetOneProduct(id as string)
    
    let info = data as Data;
    const err = error as AxiosError
    let errMessage = err?.response?.data as Message

      

        const {
            data:catData,
            isError:catIsError,
            isLoading:catIsLoading,
            error:catError,
            isSuccess:catSuccess
        } = categories.useGetCategories()
    
        
        const cAtegories = catData 
        const catErr = catError as AxiosError;
          
        let catErrMessage = catErr?.response?.data as Message


            const proMutation = useMutation({
                mutationFn:(info:FormData) =>{
                    return products.editProduct(id as string, info)
                }
            })
        
            const proErr = proMutation.error as AxiosError;
            
        
        
            useEffect(()=>{

               
                let proErrMessage = proErr?.response?.data as Message

                if(proMutation.isLoading){
                    setSpinner(true)
                }
        
                
        
                if(proMutation.isSuccess){
                    toast(proMutation.data.message)
                    setSpinner(false)
                }
        
                
                if(proMutation.isError){
                    if(proErrMessage){
                        toast(proErrMessage.message)
                    }else{
                        toast('Network Error')
                    }

                    setSpinner(false)
                }
        
            },[proMutation.isSuccess, proMutation.data, proMutation.isError, proErr, proMutation.isLoading])

            
            if(isLoading || catIsLoading)return <Loading/>
            if(isError){
                return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
            }
            if(isSuccess && data.hasOwnProperty('stack') ){
                return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
            }


            if(catIsError){
                return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{catErrMessage? catErrMessage.message : 'Network Error'}</div></div>
            }
            if(catSuccess && catData.hasOwnProperty('stack') ){
                return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
            }
       

            const initProduct:initPro =  {
                title: info.title,
                description: info.description,
                price: info.price,
                discountPercentage: info.discountPercentage,
                rating: info.rating,
                stock: info.stock,
                brand:info.brand,
                category: info.category,
                thumbnail:info.images[0],
                image1:info.images[1],
                image2:info.images[2],
                image3:info.images[3],
              }

              
    return(
        <>
            
                    <section id="content">
                            <div className="px-5 py-10">
                                <div className="mb-12 flex justify-between">
                                    <h3 className="text-2xl font-bold">Add Products</h3>
        
                                </div>
                                {isError? <div>{catErrMessage.message}</div>: isSuccess && data.hasOwnProperty('stack') ?<div>Network Error</div>:
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
                                                for (let key in values){
                                                    if (values.hasOwnProperty(key)){
                                                        formData.append(key, values[key])
                                                    }
                                                }
                                                
                                                    proMutation.mutate(formData)
                                                    setSubmitting(false)
                                                    
                                            }}
                                        >
                                            <Form>

                                            <div className="my-3 px-1 flex">
                                                <img className="mb-3 rounded" loading="lazy" src={info.images[0] as string} width={60} height={60} alt=""/>

                                                    <MyFile
                                                        label=""
                                                        id="thumbnail"
                                                        name="thumbnail"
                                                        multiple = {false}
                                                        />
                                                </div>

                                                <div className="my-3 px-1 flex">
                                                    <img className="mb-3 rounded" loading="lazy" src={info.images[1] as string} width={60} height={60} alt=""/>

                                                    <MyFile
                                                        label=""
                                                        id="image1"
                                                        name="image1"
                                                        multiple = {false}
                                                        />
                                                </div>

                                                <div className="my-3 px-1 flex">
                                                    <img className="mb-3 rounded" loading="lazy" src={info.images[2] as string} width={60} height={60} alt=""/>
                                                    <MyFile
                                                        label=""
                                                        id="image2"
                                                        name="image2"
                                                        multiple = {false}
                                                        />
                                                </div>

                                                <div className="my-3 px-1 flex">
                                                    <img className="mb-3 rounded" loading="lazy" src={info.images[3] as string} width={60} height={60} alt=""/>

                                                    <MyFile
                                                        label=""
                                                        id="image3"
                                                        name="image3"
                                                        multiple = {false}
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

                                                        {catSuccess &&
                                                            
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

export default EditProducts