import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAlt, faHeadset, faShoppingCart,faAngleDown, faSearch, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../..'
import useAuth from '../../res/useAuth';
import { createPortal } from 'react-dom';

const Navbar = ():JSX.Element=>{

    const [isOpen, setIsOpen] = useState(false);
    const cartCount = useAppSelector((state)=>state.cart)
    const { id, link } = useAuth()
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [showSearchModal, setShowSearchModal] = useState(false)

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


    const navRef = useRef<HTMLElement>(null)

    const handleScroll = () => {
        if(navRef.current !== null){
            if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
                navRef.current.style.top = "0";
            } else {
                navRef.current.style.top = "-100px";
            }
        }
    }

    const showSearch = () => {
        setShowSearchModal(!showSearchModal)
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll); 
        return () => window.removeEventListener("scroll", handleScroll);
      });

    return(
        <>


            <nav ref={navRef} className='fixed transistion duration-300 w-full z-50 -top-28 left-0 flex justify-between p-7 fill-transparent drop-shadow-lg  bg-slate-800 font-light'>
                <div className='basis-3/12'>
                    <div><Link to='/'>Logo</Link></div>
                </div>
                <div className='basis-5/12 hidden md:block'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-4/5 rounded-l h-10 focus:outline-none px-2'/>
                        <button onClick={handleSearch} className='w-1/5 bg-lime-500 rounded-r h-10 text-white  hover:bg-lime-700 transition duration-500'>search</button>
                    </form>
                </div>
                <div className='basis-4/12'>
                    <ul className='flex justify-between md:justify-around space-x-4 text-white'>
                        <li onClick={showSearch}><FontAwesomeIcon icon={faSearch} size='xl' className='text-lime-500 md:hidden'/></li>
                        <li><FontAwesomeIcon icon={faHeadset} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition duration-500 hidden md:inline'> Support &nbsp;<FontAwesomeIcon icon={faAngleDown} /></span></li>
                        <li onClick={handleCartState} className='relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='xl' className='text-lime-500'/><span className='bg-white absolute -top-2 -right-[2px] md:right-[22px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> <span className='text-sm hidden md:inline transition duration-500 hover:text-lime-500'> Cart</span></li>
                        <li>{id!== ''? <Link to={`/${link}`}><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition hidden md:inline duration-500'> User</span></Link> : <Link to='/login'><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hidden md:inline hover:text-lime-500 transition duration-500'> User</span></Link>}</li>
                    </ul>
                </div>
            </nav>

            <nav className='flex justify-between p-7 fill-transparent drop-shadow-lg  bg-slate-800 font-light'>
                <div className='basis-3/12'>
                    <div><Link to='/'>Logo</Link></div>
                </div>
                <div className='basis-5/12 hidden md:block'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-4/5 rounded-l h-10 focus:outline-none px-2'/>
                        <button onClick={handleSearch} className='w-1/5 bg-lime-500 rounded-r h-10 text-white  hover:bg-lime-700 transition duration-500'>search</button>
                    </form>
                </div>
                <div className='basis-4/12'>
                    <ul className='flex justify-between md:justify-around space-x-4 text-white'>
                        <li onClick={showSearch}><FontAwesomeIcon icon={faSearch} size='xl' className='text-lime-500 md:hidden'/></li>
                        <li><FontAwesomeIcon icon={faHeadset} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition duration-500 hidden md:inline'> Support &nbsp;<FontAwesomeIcon icon={faAngleDown} /></span></li>
                        <li onClick={handleCartState} className='relative hover:cursor-pointer'><FontAwesomeIcon icon={faShoppingCart} size='xl' className='text-lime-500'/><span className='bg-white absolute -top-2 -right-[2px] md:right-[22px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> <span className='text-sm hidden md:inline transition duration-500 hover:text-lime-500'> Cart</span></li>
                        <li>{id!== ''? <Link to={`/${link}`}><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition hidden md:inline duration-500'> User</span></Link> : <Link to='/login'><FontAwesomeIcon icon={faUserAlt} size='xl' className='text-lime-500'/> <span className='text-sm hidden md:inline hover:text-lime-500 transition duration-500'> User</span></Link>}</li>
                    </ul>
                </div>
            </nav>


            <Cart open={isOpen} changeOpenState ={handleCartState}/>

            {showSearchModal && createPortal(
                <div className='fixed top-0 left-0 w-full h-full bg-slate-100 z-[1000000000]'>
                    <form>
                        <button type='button' onClick={showSearch} className='bg-lime-500 h-10 w-1/12'><FontAwesomeIcon icon={faArrowLeft}/></button>
                        <input type="text" value={search} onChange={handleChange} className='w-10/12 rounded-l h-10 focus:outline-none px-2'/>
                        <button onClick={handleSearch} className='w-1/12 bg-lime-500 h-10 text-white  hover:bg-lime-700 transition duration-500'><FontAwesomeIcon icon={faSearch}/></button>
                    </form>
                </div>, document.body
                )
            }
           
        </>
    )
}
export default Navbar