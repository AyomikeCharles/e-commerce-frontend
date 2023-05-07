import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"

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
            <nav id="sidebar" className="fixed pt-5 z-10 h-screen w-full md:w-3/12 -left-[100%] bmd:left-0 overflow-y-scroll bg-slate-300 dark:bg-slate-800 dark:text-white">
                <div>
                    <div className="border-b pb-10 px-10"><Link to='/'>Logo</Link></div>
                </div>
                <div className="flex justify-center py-10 text-sm">
            
                    <ul>
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/dashboard'?'bg-lime-500/50':null} py-3`}>
                            <Link to='/user'>Dashboard</Link>
                        </li>
    
                        
                        <li className={`my-1 rounded  px-8 ${location.pathname === '/user/orders'?'bg-lime-500/50':null} py-3`}>
                            <Link to='/user/orders'>Orders</Link>
                        </li>

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/user/invoice'?'bg-lime-500/50':null} py-3`}>
                            <Link to='/user/invoice'>Invoice</Link>
                        </li>

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/user/wishlist'?'bg-lime-500/50':null} py-3`}>
                            <Link to='/user/wishlist'>Wishlist</Link>
                        </li>
            
                       

                        <li className={`my-1 rounded  px-8 ${location.pathname === '/admin/transactions'?'bg-lime-500/50':null} py-3`}>
                            <Link to='/user/profile'>Profile</Link>
                        </li>
                        <li className={`my-1 rounded  px-8 py-3`}>
                            <button onClick={handleLogOut}>Logout</button>
                        </li>
                    </ul>
    
                </div>
            </nav>
        </>
    )
}

export default Aside;