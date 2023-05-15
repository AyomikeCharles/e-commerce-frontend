import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MobileAside from './MobileAside';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../..';
import Cart from '../../utils/Cart';
import logo from '../../utils/images/logo.png'


const Nav = () =>{

    const [Open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const cartCount = useAppSelector((state)=>state.cart)

    const handleAsideState = () => {
        setOpen(!Open)
    } 

    const handleCartState = () => {
        setIsOpen(!isOpen)
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) =>{
        const {value} = e.target
        setSearch(value)
    }

    const handleSearch = () => {
        navigate(`/search/${search}`)
    }

    return(
        <>
            <nav className="w-full bmd:flex justify-between p-5 bg-slate-800 text-white">
                <div className='block bmd:hidden mb-3 bmd:mb-0'>
                    <div className='flex justify-between bmd:hidden'>
                        <div className='w-full flex'>
                            <span className='pt-1 border px-3 rounded' onClick={handleAsideState}><FontAwesomeIcon icon={faBars} size='lg'  /></span>
                            <span><Link to='/'><img className='w-10/12' loading='lazy' src={logo} alt="logo"/></Link></span>

                        </div>
                        
                        <ul className="flex justify-center bmd:justify-end">
                            <li className='relative mx-5 pt-1'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faBell} size='lg' className='text-lime-500' /></span><span className='bg-white absolute -top-1 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                            <li onClick={handleCartState} className='pt-1 relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='lg' className='text-lime-500'/><span className='bg-white absolute -top-1 -right-[4px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span></li>
                        </ul>
                    </div>
                </div>
                <div className='md:w-6/12'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-5/6 text-black px-2 focus:outline-none rounded-l h-10'/>
                        <button onClick={handleSearch} className='w-1/6 bg-lime-500 rounded-r h-10 text-white'><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
                    <ul className="hidden bmd:flex bmd:justify-end mt-2">
                        <li className='relative mx-5'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faBell} size='lg' className='text-lime-500' /></span><span className='bg-white absolute -top-2 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                        <li onClick={handleCartState} className='relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='lg' className='text-lime-500'/><span className='bg-white absolute -top-2 -right-[4px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span></li>
                    </ul>
                
            </nav>
            <Cart open={isOpen} changeOpenState ={handleCartState}/>

            <aside className='bmd:hidden'>
                <MobileAside open={Open} changeOpenState ={handleAsideState}/>
            </aside>
        </>
    )
}

export default Nav;