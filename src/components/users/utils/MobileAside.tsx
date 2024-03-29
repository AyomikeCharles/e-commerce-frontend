import { FiList, FiHeart, FiUser, FiXOctagon } from "react-icons/fi";
import { BsDoorOpen, BsReceiptCutoff  } from "react-icons/bs";
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { logout } from "../../../slicer/authSlice"
import logo from '../../utils/images/logo.png'

type Props = {
    open:boolean,
    changeOpenState:()=>void
}


const MobileAside:React.FC<Props> = ({open, changeOpenState}):JSX.Element =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogOut = () =>{
        TokenService.removeUser()
        dispatch(logout())
        navigate('/')
    }

   

    const cartDrawer = useRef<HTMLElement>(null)
    useEffect(()=>{

        if(open){
            cartDrawer.current?.classList.add('left0')
            cartDrawer.current?.classList.remove('minusleft')
            cartDrawer.current?.classList.remove('-left-[100%]')
        }else{

            cartDrawer.current?.classList.add('-left-[100%]')
            if(cartDrawer.current?.classList.contains('left0')){
                cartDrawer.current?.classList.add('minusleft')
                cartDrawer.current?.classList.remove('left0')
            }
        }

    }, [open])

   

    
    return(
        <>
            
                <nav ref={cartDrawer} id="sidebar" className="fixed -left-[100%] transition duration-500 top-0 pt-5 w-full h-full z-50 bg-white">

                    <div className="flex justify-between border-b px-10 py-3">
                    
                        <div className=""><Link to='/' className="flex w-10/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-4 md:mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>
                        
                        <div className='flex justify-end'>

                            <button onClick={changeOpenState} className="mx-5">
                                <FiXOctagon size='30' className='drop-shadow-sm font-light'/>
                            </button>

                        </div>
                    </div>            
    
                <div className="flex text-lg py-10">
            
                    <ul>
                    <li onClick={changeOpenState} className={`my-1 rounded  px-8 py-3 flex`}>
                            <FiUser size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user'>Profile</Link>
                        </li>
    
                        
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 py-3 flex`}>
                            <FiList size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/orders'>Orders</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 py-3 flex`}>
                            <BsReceiptCutoff size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/invoice'>Invoice</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded px-8 py-3 flex`}>
                            <FiHeart size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/wishlist'>Wishlist</Link>
                        </li>
            
                 
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 py-3 flex`}>
                            <BsDoorOpen size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>


                {/* </section> */}
    
        </>
    )
}

export default MobileAside;