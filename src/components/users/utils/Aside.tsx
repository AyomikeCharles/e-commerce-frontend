import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { logout } from "../../../slicer/authSlice"
import { FiList, FiHeart, FiUser } from "react-icons/fi";
import { BsDoorOpen, BsReceiptCutoff  } from "react-icons/bs";
import logo from '../../utils/images/logo.png'


const Aside = () =>{

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogOut = () =>{
        TokenService.removeUser()
        dispatch(logout())
        navigate('/')
    }

    return(
        <>
        {/* add icons later */}
            <nav id="sidebar" className="fixed z-10 h-screen w-full md:w-2/12 -left-[100%] bmd:left-0 bg-white">
                <div>
                    <div className="pb-7 pt-5 px-5"><Link to='/' className="flex w-11/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>

                </div>
                <div className="flex py-10">
            
                    <ul className="w-full">
                        <li className={`my-1 px-5 ${location.pathname === '/user'?'bg-purple-100/50':null} py-3 flex`}>
                            <FiUser size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user'>Profile</Link>
                        </li>
    
                        
                        <li className={`my-1 flex  px-5 ${location.pathname === '/user/orders'?'bg-purple-100/50':null} py-3`}>
                            <FiList size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/orders'>Orders</Link>
                        </li>

                        <li className={`my-1 flex  px-5 ${location.pathname === '/user/invoice'?'bg-purple-100/50':null} py-3`}>
                            <BsReceiptCutoff size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/invoice'>Invoice</Link>
                        </li>

                        <li className={`my-1 flex px-5 ${location.pathname === '/user/wishlist'?'bg-purple-100/50':null} py-3`}>
                            <FiHeart size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/wishlist'>Wishlist</Link>
                        </li>
            
                        <li className={`my-1 px-5 py-3 flex`}>
                            <BsDoorOpen size='30' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>
        </>
    )
}

export default Aside;