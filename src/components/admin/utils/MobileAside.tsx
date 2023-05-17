import { RxDashboard } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { CgProductHunt } from "react-icons/cg";
import { FiList, FiUser, FiShoppingBag, FiXOctagon, FiUsers } from "react-icons/fi";
import { BsDoorOpen, BsReceiptCutoff  } from "react-icons/bs";
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"
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
        dispatch(reset())
        navigate('/')
    }

   

    const cartDrawer = useRef<HTMLElement>(null)
    useEffect(()=>{

        if(open){
            cartDrawer.current?.classList.add('left0')
            cartDrawer.current?.classList.remove('-left-[100%]')
            cartDrawer.current?.classList.remove('minusleft')

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
            

                <nav ref={cartDrawer} id="sidebar" className="fixed -left-[100%] overflow-y-scroll transition duration-500 top-0 pt-5 w-full h-full z-50 bg-white">

                    <div className="flex justify-between border-b px-10 py-3">
                    <div className=""><Link to='/' className="flex w-9/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-4 md:mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>


                        <div className='flex justify-end'>

                        <button onClick={changeOpenState} className="">
                            <FiXOctagon size='25' className='drop-shadow-sm font-light'/>
                        </button>

                        </div>
                    </div>            
    
                <div className="flex text-lg py-10">
            
                    <ul>
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <RxDashboard size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin'>Dashboard</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <CgProductHunt size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/products'>Products</Link>
                        </li>
    
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <FiList size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/categories'>Categories</Link>
                        </li>
                        
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <FiShoppingBag size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/orders'>Orders</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <BsReceiptCutoff size='25' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/invoice'>Invoice</Link>
                        </li>
            
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <FiUsers size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/users'>Users</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <GrUserAdmin size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/admins'>Admins</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <CiLocationOn size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/region'>Region</Link>
                        </li> 

                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <FiUser size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/profile'>Profile</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 flex rounded  px-8 py-3`}>
                            <BsDoorOpen size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
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