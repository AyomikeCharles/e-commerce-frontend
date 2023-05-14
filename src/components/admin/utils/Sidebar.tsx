import { Link, useLocation, useNavigate } from "react-router-dom"
import { faBagShopping, faDashboard, faDoorOpen, faList12, faListAlt, faLocation, faReceipt, faUser, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"
import logo from '../../utils/images/logo.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Sidebar = () =>{

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
       
            <nav id="sidebar" className="fixed z-10 h-screen w-full md:w-2/12 -left-[100%] bmd:left-0 bg-slate-800 overflow-y-scroll text-white">
                <div>
                    <div className="border-b border-r pb-7 pt-5 px-10"><Link to='/'><img loading='lazy' src={logo} alt="logo"/></Link></div>
                </div>
                <div className="flex py-10">
            
                    <ul className="w-full">
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/dashboard'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faDashboard} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin'>Dashboard</Link>
                        </li>
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/products'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faListAlt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>  
                            <Link to='/admin/products'>Products</Link>
                        </li>
    
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/categories'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faList12} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/categories'>Categories</Link>
                        </li>
                        
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/orders'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faBagShopping} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/orders'>Orders</Link>
                        </li>

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/invoice'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faReceipt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/invoice'>Invoice</Link>
                        </li>
            
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/users'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUsers} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/users'>Users</Link>
                        </li>
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/admins'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUserCheck} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/admins'>Admins</Link>
                        </li>

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/region'?'bg-lime-50/50':null} py-3`}>
                            <FontAwesomeIcon icon={faLocation} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/region'>Region</Link>
                        </li> 

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/transactions'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUser} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/profile'>Profile</Link>
                        </li>
                        <li className={`my-1 rounded  px-8 py-3`}>
                            <FontAwesomeIcon icon={faDoorOpen} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>
        </>
    )
}

export default Sidebar;


                        
                        
                        
                      

            
                       


                       
                       