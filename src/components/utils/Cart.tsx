import { useAppDispatch, useAppSelector } from "../..";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart, ChangeCartItemQty, emptyCart } from "../../slicer/cartSlice";
import { Link } from "react-router-dom";

import { useEffect, useRef } from 'react';

type Props = {
    open:boolean,
    changeOpenState:()=>void
}


const Cart:React.FC<Props> = ({open, changeOpenState}):JSX.Element =>{

    const dispatch = useAppDispatch();

    const cartDrawer = useRef<HTMLElement>(null)
    useEffect(()=>{

        if(open){
            cartDrawer.current?.classList.add('c-right')
            cartDrawer.current?.classList.remove('cr-right')
            cartDrawer.current?.classList.remove('-right-full')
        }else{
            cartDrawer.current?.classList.add('-right-full')
            cartDrawer.current?.classList.remove('c-right')
            cartDrawer.current?.classList.add('cr-right')
        }

    }, [open])

    const cartItems = useAppSelector((state)=>state.cart)

    
    return(
        <>
            
                <section ref={cartDrawer} className="top-0 -right-[100%] fixed min-h-full w-9/12 md:w-2/6 xl:w-4/12 z-20 bg-gray-100 drop-shadow-lg">
                    <div className="flex justify-end">
                        <button onClick={changeOpenState} className="mx-10 my-3">
                            <FontAwesomeIcon icon={faTimesCircle} size='2xl' className='text-gray-300 drop-shadow-sm'/>
                        </button>
                    </div>
                    
                    <h5 className="text-2xl text-center my-2">Cart Items</h5>
                    
                    
                    
                    {cartItems.items.length !== 0 ? 
                    <div>
                        <div className="w-11/12 mx-auto max-h-[350px] border-2 overflow-y-scroll px-1">
                            {
                                cartItems.items.map((val)=>(
                                    <div key={val.id} className="my-5 border-b-2 pb-5 flex">
                                        <img src={val.images[0]} className="w-4/12 rounded drop-shadow" alt="..."/>
                                        <div className="px-3">
                                            <div className="my-1">{val.title}</div>
                                            <div className="my-1">{val.price}</div>
                                            
                                            <div className="my-1">
                                                <button onClick={()=>dispatch(ChangeCartItemQty({operation:'increase', id:val.id}))} className="rounded mx-1 px-3 py-1 bg-lime-500 transition duration-500  hover:bg-lime-700">
                                                    +
                                                </button>
                                                <span> {val.qty} </span>
                                                <button onClick={()=>dispatch(ChangeCartItemQty({operation:'decrease', id:val.id}))} className="rounded mx-1 px-3 py-1 bg-lime-500 transition duration-500  hover:bg-lime-700">
                                                    -
                                                </button>
                                            </div>
                                            <span onClick={()=>dispatch(removeFromCart({id: val.id}))} className="hover:text-lime-500 cursor-pointer">Remove</span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="my-4 text-center">
                            <div className="font-bold text-xl">
                                Cart Subtotal:  {cartItems.totalPrice}
                            </div>
                            <Link to="/checkout"  className="block w-8/12 rounded mx-auto my-4 px-4 py-2 bg-lime-500 transition duration-500  hover:bg-lime-700">
                                Check out
                            </Link>
                            
                            <span onClick={()=>dispatch(emptyCart())} className="hover:text-red-600 transition duration-500 cursor-pointer">
                                Clear Cart
                            </span>
                            
                        </div>
                    </div>
                    

                    :
                        <div className="w-2/3 md:6/12 text-center mx-auto py-20">
                            there are no items in you cart, <span onClick={changeOpenState} className="hover:text-lime-500 transition duration-500 cursor-pointer" >Close</span>
                        </div>
                    }

                </section>
    
        </>
    )
}

export default Cart;