import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDoorOpen, faHeart, faList, faReceipt, faUser } from "@fortawesome/free-solid-svg-icons"
import logo from '../../utils/images/logo.png'


const Aside = () =>{

    const location = useLocation()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogOut = () =>{
        TokenService.removeUser()
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return(
        <>
        {/* add icons later */}
            <nav id="sidebar" className="fixed z-10 h-screen w-full md:w-2/12 -left-[100%] bmd:left-0 bg-slate-800 text-white">
                <div>
                    <div className="border-b border-r pb-7 pt-5 px-10"><Link to='/'><img loading='lazy' src={logo} alt="logo"/></Link></div>
                </div>
                <div className="flex py-10">
            
                    <ul className="w-full">
                        <li className={`my-1 px-5 ${location.pathname === '/user'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUser} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user'>Profile</Link>
                        </li>
    
                        
                        <li className={`my-1  px-5 ${location.pathname === '/user/orders'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faList} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/orders'>Orders</Link>
                        </li>

                        <li className={`my-1  px-5 ${location.pathname === '/user/invoice'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faReceipt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/invoice'>Invoice</Link>
                        </li>

                        <li className={`my-1 px-5 ${location.pathname === '/user/wishlist'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faHeart} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/wishlist'>Wishlist</Link>
                        </li>
            
                        <li className={`my-1 px-5 py-3`}>
                            <FontAwesomeIcon icon={faDoorOpen} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>
        </>
    )
}

export default Aside;