import { faBagShopping, faDashboard, faDoorOpen, faList, faList12, faListAlt, faLocation, faReceipt, faShoppingBag, faTimes, faUser, faUserCheck, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"
import logo from '../../utils/images/logo.png'

type Props = {
    open:boolean,
    changeOpenState:()=>void
}


const MobileAside:React.FC<Props> = ({open, changeOpenState}):JSX.Element =>{

    const location = useLocation()
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
                        <div className=""><Link to='/'><img className='w-10/12' loading='lazy' src={logo} alt="logo"/></Link></div>

                        <div className='flex justify-end'>

                        <button onClick={changeOpenState} className="mx-5 border px-3 rounded">
                            <FontAwesomeIcon icon={faTimes} size='xl' className='drop-shadow-sm font-light'/>
                        </button>

                        </div>
                    </div>            
    
                <div className="flex text-lg py-10">
            
                    <ul>
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/dashboard'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faDashboard} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin'>Dashboard</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/products'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faListAlt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/products'>Products</Link>
                        </li>
    
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/categories'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faList12} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/categories'>Categories</Link>
                        </li>
                        
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/orders'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faBagShopping} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/orders'>Orders</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/invoice'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faReceipt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/> 
                            <Link to='/admin/invoice'>Invoice</Link>
                        </li>
            
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/users'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUsers} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/users'>Users</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/admins'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUserCheck} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/admins'>Admins</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/region'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faLocation} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/region'>Region</Link>
                        </li> 

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/transactions'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faUser} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/admin/profile'>Profile</Link>
                        </li>
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 py-3`}>
                            <FontAwesomeIcon icon={faDoorOpen} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
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