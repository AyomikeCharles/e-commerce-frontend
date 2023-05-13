import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import MobileAside from './MobileAside';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../..';
import Cart from '../../utils/Cart';

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
            <nav className="w-full bmd:flex justify-between px-10 py-5 bg-slate-800 text-white">
                <div className='mb-3 bmd:mb-0'>
                    <div className='flex justify-between bmd:hidden'>
                        <div>
                            <span className='mr-5' onClick={handleAsideState}><FontAwesomeIcon icon={faBars} size='lg'  /></span>
                            <span><Link to='/'>logo</Link></span>
                        </div>
                        
                        <ul className="flex justify-center bmd:justify-end">
                            <li className='relative mx-5'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faBell} size='lg' className='text-lime-500' /></span><span className='bg-white absolute -top-2 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                            <li onClick={handleCartState} className='relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='lg' className='text-lime-500'/><span className='bg-white absolute -top-2 -right-[4px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span></li>
                        </ul>
                    </div>
                </div>
                <div className='justify-center'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-5/6 text-black px-2 focus:outline-none rounded-l h-10'/>
                        <button onClick={handleSearch} className='w-1/6 bg-lime-500 rounded-r h-10 text-white'><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>
            </nav>
            <Cart open={isOpen} changeOpenState ={handleCartState}/>

            <aside className='bmd:hidden'>
                <MobileAside open={Open} changeOpenState ={handleAsideState}/>
            </aside>
        </>
    )
}

export default Nav;