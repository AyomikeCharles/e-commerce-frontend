import { faDashboard, faDoorOpen, faHeart, faList, faReceipt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom"
import TokenService from "../../../res/tokenService"
import { useAppDispatch } from "../../.."
import { reset, logout } from "../../../slicer/authSlice"

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
                        <div className=""><Link to='/'>Logo</Link></div>

                        <div className='flex justify-end'>

                            <button onClick={changeOpenState} className="mx-5">
                                <FontAwesomeIcon icon={faTimes} size='2xl' className='drop-shadow-sm'/>
                            </button>

                        </div>
                    </div>            
    
                <div className="flex text-lg py-10">
            
                    <ul>
                    <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/admin/dashboard'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faDashboard} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user'>Dashboard</Link>
                        </li>
    
                        
                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/user/orders'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faList} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/orders'>Orders</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/user/invoice'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faReceipt} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/invoice'>Invoice</Link>
                        </li>

                        <li onClick={changeOpenState} className={`my-1 rounded  px-8 ${location.pathname === '/user/wishlist'?'bg-lime-500/50':null} py-3`}>
                            <FontAwesomeIcon icon={faHeart} size='lg' className='drop-shadow-sm mr-3 text-lime-500'/>
                            <Link to='/user/wishlist'>Wishlist</Link>
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