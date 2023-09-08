import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { logout } from "../../../slicer/authSlice"
import logo from '../../utils/images/logo.png'
import { RxDashboard } from "react-icons/rx";
import { CiLocationOn } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";
import { CgProductHunt } from "react-icons/cg";
import { FiList, FiUser, FiShoppingBag, FiUsers } from "react-icons/fi";
import { BsDoorOpen, BsReceiptCutoff  } from "react-icons/bs";

const Sidebar = () =>{

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
       
            <nav id="sidebar" className="fixed z-10 h-screen w-full md:w-2/12 -left-[100%] bmd:left-0 bg-white overflow-y-scroll">
                <div>
                    <div className="pb-7 pt-5 px-5"><Link to='/' className="flex w-11/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>
                    
                </div>
                <div className="flex py-10">
            
                    <ul className="w-full">
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin'?'bg-purple-100/50':null} py-3`}>
                            <RxDashboard size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin'>Dashboard</Link>
                        </li>
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/products'?'bg-purple-100/50':null} py-3`}>
                            <CgProductHunt size='25' className='drop-shadow-sm mr-3 text-lime-500'/>  
                            <Link to='/admin/products'>Products</Link>
                        </li>
    
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/categories'?'bg-purple-100/50':null} py-3`}>
                            <FiList size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/categories'>Categories</Link>
                        </li>
                        
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/orders'?'bg-purple-100/50':null} py-3`}>
                            <FiShoppingBag size='25' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/orders'>Orders</Link>
                        </li>

                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/invoice'?'bg-purple-100/50':null} py-3`}>
                            <BsReceiptCutoff size='25' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/invoice'>Invoice</Link>
                        </li>
            
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/users'?'bg-purple-100/50':null} py-3`}>
                            <FiUsers size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/users'>Users</Link>
                        </li>
                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/admins'?'bg-purple-100/50':null} py-3`}>
                            <GrUserAdmin size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/admins'>Admins</Link>
                        </li>

                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/region'?'bg-purple-100/50':null} py-3`}>
                            <CiLocationOn size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/region'>Region</Link>
                        </li> 

                        <li className={`my-1 flex rounded  px-8 ${location.pathname === '/admin/transactions'?'bg-purple-1000/50':null} py-3`}>
                            <FiUser size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/profile'>Profile</Link>
                        </li>
                        <li className={`my-1 flex rounded  px-8 py-3`}>
                            <BsDoorOpen size='25' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>
        </>
    )
}

export default Sidebar;


                        
                        
                        
                      

            
                       


                       
                       