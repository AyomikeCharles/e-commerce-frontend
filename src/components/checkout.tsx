import Footer from "./utils/Footer";
import Navbar from "./utils/Navbar";
import { useState, useEffect } from 'react';
import { useAppSelector } from "..";
import * as Yup from 'yup'
import { Message } from "../slicer/authSlice";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import sales from "../res/salesService";
import { toast, ToastContainer } from "react-toastify";
import { useAppDispatch } from "..";
import { emptyCart } from "../slicer/cartSlice";
import region from "../res/stateService";
import Loading from "./utils/Loading";
import { S } from "./admin/Region";
import Spinner from "./utils/Spinner";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {

    const navigate = useNavigate()
    const cartItems = useAppSelector(state => state.cart)
    const [section, setSection] = useState('shipping');
    const [lgaInfo, setLgaInfo] = useState('select');
    const [spinner, setSpinner] = useState(false);
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.authUser)
    
 
    const [formData, setFormData] = useState({
        name:authUser.user? authUser?.user?.fullName: '',
        email:authUser.user? authUser?.user?.email: '',
        phoneNumber:authUser.user? authUser?.user?.phoneNumber: '',
        whatsapp:authUser.user? authUser?.user?.whatsapp: '',
        state:'',
        stateName:'',
        lga:'',
        address:'',
        moreDetails:'',
        shippingPrice:'',
        subtotal:cartItems.totalPrice,
        products:cartItems.items
    })


    const validationSchema = Yup.object({
    name:Yup.string().required(),
    email:Yup.string().email().required(),
    phoneNumber:Yup.string().required(),
    whatsapp:Yup.string(),
    state:Yup.string().required(),
    lga:Yup.string().required(),
    address:Yup.string().required(),
    moreDetails:Yup.string(),
    })


    //get all states
    const {
        data,
        isError,
        isLoading,
        isSuccess,
        error
    } = region.useGetStates()

    const states = data as S[]
    const err1 = error as AxiosError;
    let errMessage1 = err1?.response?.data as Message

        const {
            data:lgaData,
            refetch,
            isFetched,
            isRefetchError,
            isFetching,
            error:lgaError
        } = region.useGetLgaByState(formData.state)
    
        const err2 = lgaError as AxiosError;
        useEffect(()=>{
            let errMessage2 = err2?.response?.data as Message
            
            if(isFetched && lgaData === null){
                // setLgaInfo('')
            }else{

                if(isFetched && lgaData.hasOwnProperty('lgas')){
                    setLgaInfo(lgaData.lgas)
                 }else{
                    toast(lgaData?.message)
                 }
            }

            if(isFetching){
                //do spinning here
            }
    
            if(isRefetchError){
                if(errMessage2){
                    toast(errMessage2.message)
                }else{
                    toast('Network Error')
                }
            }
    
        },[isFetched, isRefetchError, isFetching, err2, lgaData])

    



    const salesMutation = useMutation({
        mutationFn:(info:object) =>{
            return sales.setSales(info)
        }
    })

    const err = salesMutation.error as AxiosError;

    useEffect(()=>{

       
        let errMessage = err?.response?.data as Message

        if(salesMutation.isLoading){
            setSpinner(true)
        }

        if(salesMutation.isSuccess){
            if(salesMutation.data.hasOwnProperty('message')){
                toast(salesMutation.data.message)
            }else{
                toast('success')
                dispatch(emptyCart())
                navigate(`/payment/${salesMutation.data._id}`)
            }
            setSpinner(false)
        }

        

        if(salesMutation.isError){
            if(errMessage){
                toast(errMessage.message)
            }else{
                toast('Network Error')
            }
            setSpinner(false)
        }

    },[salesMutation.isSuccess, salesMutation.data, salesMutation.isLoading, salesMutation.isError, err, navigate, dispatch])
    

    //change to next or previous
    const handleSection = async (param:string) =>{
        try{
            
            await validationSchema.validate(formData)
            setSection(param)
            
        }catch(errors){
            toast('you left some field blank')
        }

    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>{
        const { name, value } = e.target
        setFormData(prev => ({...prev, [name]:value }))

        if(name === 'state'){
            refetch()
            const stateDetails = states?.find(state => state?._id === value)
            setFormData(prev => ({...prev, shippingPrice:stateDetails?.price as string, stateName:stateDetails?.state as string}))
        }

    }

    const handleBlur = () =>{
        //work on handle blur
    }


    if(isLoading)return<Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage1? errMessage1.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }


    return(
        <>
            <Navbar/>
           
            <section className="py-16">
            {section === 'shipping'? isSuccess && 

                <section id="shipping">
                    <div className="md:flex">
                        <div className="basis-1/2">
                            <div className="w-9/12 mx-auto">
                               <form>
                                    <h3 className="text-center my-5 text-2xl">Personal Details</h3>


                                        <div className="my-3">
                                           <label>Name:</label>
                                           <br/>
                                           <input
                                            name='name'
                                            id='name'
                                            className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                            value={formData.name}
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={handleBlur}
                                           />
                                        </div>

                                        <div className="my-3">
                                           <label>Email Address:</label>
                                           <br/>
                                           <input
                                            name='email'
                                            id='email'
                                            className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                            value={formData.email}
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={handleBlur}
                                           />
                                        </div>

                                        <div className="my-3">
                                           <label>Phone Number:</label>
                                           <br/>
                                           <input
                                            name='phoneNumber'
                                            id='phoneNumber'
                                            className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                            value={formData.phoneNumber}
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={handleBlur}
                                           />
                                        </div>

                                        
                                      


                                        <div className="my-3">
                                           <label>WhatsApp Number (optional):</label>
                                           <br/>
                                           <input
                                            name='whatsapp'
                                            id='whatsapp'
                                            className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                            value={formData.whatsapp}
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={handleBlur}
                                           />
                                        </div>

                                        <h3 className="text-center my-5 text-2xl">Shipping Details</h3>

                                        
                                        <div className="my-3">
                                            <label>State</label>
                                            <br/>
                                            <select
                                                id="state" 
                                                name='state'
                                                value={formData.state}
                                                className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                                onChange={(e)=>handleChange(e)}
                                                onBlur={handleBlur}
                                                >
                                                    <option>select</option>
                                                    {
                                                        states?.map((val:S)=>(
                                                            <option key={val._id} value={val._id}>{val.state}</option>
                                                        ))
                                                    }
                                                    
                                            </select>
                                        </div>


                                        <div className="my-3">
                                            <label>Local Govt:</label>
                                            <br/>
                                            <select
                                                id="lga" 
                                                name='lga'
                                                value={formData.lga}
                                                className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                                onChange={(e)=>handleChange(e)}
                                                onBlur={handleBlur}
                                                >
                                                    <option>select</option>
                                                    
                                                    {
                                                        lgaInfo?.split(',').map((val:string)=>(
                                                            <option key={val} value={val}>{val}</option>
                                                        ))
                                                    }
                                                    
                                            </select>
                                        </div>


                                        <div className="my-3">
                                           <label>Address:</label>
                                           <br/>
                                           <input
                                            name='address'
                                            id='address'
                                            className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                            value={formData.address}
                                            onChange={(e)=>handleChange(e)}
                                            onBlur={handleBlur}
                                           />
                                        </div>



                                        <div className="my-3">
                                            <label>More Details (optional):</label>
                                            <br/>
                                            <textarea
                                                id="moreDetails"
                                                name="moreDetails"
                                                value={formData.moreDetails}
                                                className="text-input border p-2 rounded focus:outline-none w-full bg-slate-50"
                                                onChange={(e)=>handleChange(e)}
                                                onBlur={handleBlur}
                                            >

                                            </textarea>
                                        </div>
                                        <div className="flex justify-center my-5">
                                            <button type="button" onClick={()=>handleSection('review')}  className="bg-lime-500 rounded-r h-10 hover:bg-lime-700 mx-2 px-5 transition duration-500">Next</button>
                                        </div>
                                    </form>
                            </div>
                        </div>
                        <div className="basis-1/2">

                        <div className="my-10 w-10/12 mx-auto">
                            {
                                cartItems.items.map((val)=>(
                                    <div key={val.id} className="my-5 border-b-2 pb-5 flex">
                                        <img src={val.images[0]} className="w-4/12 rounded drop-shadow" alt="..."/>
                                        <div className="px-3">
                                            <div className="my-1">{val.title}</div>
                                            <div className="my-1">{val.price}</div>
                                            <div className="my-1">{val.qty}</div>
                                            <div className="my-1">{val.qty * val.price}</div>
                                            
                                        </div>
                                    </div>
                                ))
                            }

                        </div>

                        </div>
                    </div>
                </section>
            
            :
                <section id="review">

                    <div className="md:flex">
                        <div className="basis-1/2">
                            <div className="w-11/12 md:w-9/12 mx-auto bg-slate-50 rounded px-2">
                                <div className="border-b-2 py-4 px-3 flex">
                                    <div className="mr-4">Name:</div>
                                    <div className="">{formData.name}</div>
                                </div>
                                <div className="border-b-2 py-4 px-3 flex">
                                    <div className="mr-4">Email:</div>
                                    <div className="">{formData.email}</div>
                                </div>
                                <div className="border-b-2 py-4 px-3 flex">
                                    <div className="mr-4">Phone Number:</div>
                                    <div className="">{formData.phoneNumber}</div>
                                </div>
                                <div className="py-4 px-3 flex">
                                    <div className="mr-4">Address:</div>
                                    <div className="">{`${formData.stateName}, ${formData.lga}, ${formData.address}`}</div>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/2">

                        <div className="my-10 w-10/12 mx-auto">
                            {
                                cartItems.items.map((val)=>(
                                    <div key={val.id} className="my-5 border-b-2 pb-5 flex">
                                        <img src={val.images[0]} className="w-4/12 rounded drop-shadow" alt="..."/>
                                        <div className="px-3">
                                            <div className="my-1">{val.title}</div>
                                            <div className="my-1">{val.price}</div>
                                            <div className="my-1">{val.qty}</div>
                                            <div className="my-1">{val.qty * val.price}</div>
                                            
                                        </div>
                                    </div>
                                ))
                            }

                            <div className="flex justify-between my-3">
                                <div>
                                    Cart Subtotal:
                                </div>
                                <div>
                                    {cartItems.totalPrice}
                                </div>
                            </div>

                            <div className="flex justify-between my-3">
                                <div>
                                    Shipping fee:
                                </div>
                                <div>
                                    {formData.shippingPrice}
                                </div>
                            </div>

                            <div className="flex justify-between my-3 text-2xl font-bold">
                                <div>
                                    Order Total:
                                </div>
                                <div className="text-lime-500">
                                    {cartItems.totalPrice + parseInt(formData.shippingPrice)}
                                </div>
                            </div>


                        <div className="flex justify-center my-5">
                            <button onClick={()=>handleSection('shipping')} className="bg-lime-500 rounded-r h-10 hover:bg-lime-700 mx-2 px-5 transition duration-500">Previous</button>
                            <button onClick={()=>salesMutation.mutate(formData)} className="bg-lime-500 rounded-r h-10 hover:bg-lime-700 mx-2 px-5 transition pt-2 duration-500 inline-flex"> {spinner? <Spinner/> : null} Complete</button>
                        </div>
                        </div>

                        </div>
                        
                    </div>

                </section>
            }
                
            </section>
        
            <Footer/>
            <ToastContainer/>
        </>
    )
}

export default CheckOut;