import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faHeadset, faShoppingCart,faAngleDown, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import { useState } from 'react'
import { useAppSelector } from '../..'
import useAuth from '../../res/useAuth';

const Navbar = ():JSX.Element=>{

    const [isOpen, setIsOpen] = useState(false);
    const cartCount = useAppSelector((state)=>state.cart)
    const { id, link } = useAuth()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target
        setSearch(value)
    }

    const handleCartState = () => {
        setIsOpen(!isOpen)
    }
    const handleSearch = () => {
        navigate(`/search/${search}`)
    }

    return(
        <>
            <nav className='p-7 fill-transparent drop-shadow-lg  bg-slate-800 font-light hidden md:flex'>
                <div className='flex-1 w-1/5 text-lime-500'><Link to='/'>Logo</Link></div>
                <div className='flex-3 w-2/5'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-4/5 rounded-l h-10 focus:outline-none px-2'/>
                        <button onClick={handleSearch} className='w-1/5 bg-lime-500 rounded-r h-10 text-white  hover:bg-lime-700 transition duration-500'>search</button>
                    </form>
                </div>
                <ul className='flex flex-2 w-2/5 justify-evenly text-white'>
                    <li><FontAwesomeIcon icon={faHeadset} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition duration-500'> Support &nbsp;<FontAwesomeIcon icon={faAngleDown} /></span></li>
                    <li onClick={handleCartState} className='relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='xl' className='text-lime-500'/><span className='bg-white absolute -top-2 right-[22px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> <span className='text-sm transition duration-500 hover:text-lime-500'> Cart</span></li>
                    <li>{id!== ''? <Link to={`/${link}`}><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition duration-500'> User</span></Link> : <Link to='/login'><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition duration-500'> User</span></Link>}</li>
                </ul>
            </nav>

            <nav className='px-7 py-5 bg-slate-800 font-light block md:hidden'>
                <div className='flex'>

                    <div className='flex-1 w-1/5 text-lime-500 mb-5'>
                        <FontAwesomeIcon icon={faBars}/>
                        <span className='ml-3'>
                            Logo
                        </span>
                    </div>
                    
                    <ul className='flex flex-2 w-2/5 justify-evenly text-white'>
                        <li><FontAwesomeIcon icon={faHeadset} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500'> </span></li>
                        <li onClick={handleCartState} className='relative'><FontAwesomeIcon icon={faShoppingCart} size='xl' className='text-lime-500'/><span className='bg-white absolute -top-2 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> </li>
                        <li>{id!==''? <Link to={`/${link}`}><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/></Link> : <Link to='/login'><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/></Link>}</li>
                    
                    </ul>
                </div>
                <div className='justify-center'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-5/6 focus:outline-none rounded-l h-10'/>
                        <button onClick={handleSearch} className='w-1/6 bg-lime-500 rounded-r h-10 text-white'><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
            </nav>

            <Cart open={isOpen} changeOpenState ={handleCartState}/>
           
        </>
    )
}
export default Navbar