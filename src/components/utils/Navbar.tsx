
import { FiUser, FiShoppingCart, FiChevronDown, FiSearch, FiArrowLeft, FiPhone, FiMail } from "react-icons/fi"
import { BsHeadset } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import Cart from './Cart'
import logo from './images/logo.png'
import { useState, useRef, useEffect } from 'react'
import { useAppSelector } from '../..'
import useAuth from '../../res/useAuth';
import { createPortal } from 'react-dom';

const Navbar = ():JSX.Element=>{

    const [isOpen, setIsOpen] = useState(false);
    const [showSupourt, setShowSupourt] = useState(false)
    const [showSupourt1, setShowSupourt1] = useState(false)

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
            if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
                navRef.current.style.top = "0";
            } else {
                navRef.current.style.top = "-200px";
            }
        }
        setShowSupourt(false)
        setShowSupourt1(false)

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

            <nav ref={navRef} className='fixed px-3 md:px-7 py-5 transistion duration-300 w-full z-10 -top-28 left-0 flex justify-between fill-transparent drop-shadow-lg bg-white text-black'>
                <div className='basis-6/12 md:basis-3/12'>
                    <div className='flex justify-center'><Link to='/' className="flex md:w-6/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-4 md:mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>
                </div>
                <div className='md:basis-5/12 pt-3 hidden md:block'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-4/5 rounded-l h-10 border border-lime-500 focus:outline-none px-2' placeholder="product name"/>
                        <button onClick={handleSearch} className='w-1/5 bg-lime-500 rounded-r h-10 text-white  hover:bg-lime-700 transition duration-500'>search</button>
                    </form>
                </div>
                <div className='basis-4/12 pt-5'>
                    <ul className='flex justify-between md:justify-around space-x-3 md:space-x-4'>
                        <li onClick={showSearch}><FiSearch size="20" className='text-lime-500 md:hidden'/></li>
                        <li className='relative flex' onMouseEnter={()=>setShowSupourt(true)} onMouseLeave={()=>setShowSupourt(false)}>
                            <BsHeadset size="20" className='text-lime-500'/> 
                            <span className='text-sm hover:text-lime-500 transition duration-500 hidden md:flex'> Support &nbsp;<FiChevronDown /></span>
                            {showSupourt &&
                                <div className='absolute z-50 top-5 w-[140px] -left-10 md:left-0 p-3 rounded shadow bg-white text-black'>
                                    <FiPhone size="20" className='text-lime-500'/> phone
                                    <hr className='my-1'/>
                                    <FiMail size="20" className='text-lime-500'/> whatsapp
                                </div>
                            }
                        </li>
                        <li onClick={handleCartState} className='relative hover:cursor-pointer flex'><FiShoppingCart size="20" className='text-lime-500'/><span className='bg-lime-500 absolute -top-2 -right-[2px] md:right-[22px] w-4 h-4 text-white text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> <span className='text-sm hidden md:inline transition duration-500 hover:text-lime-500'> Cart</span></li>
                        <li>{id!== ''? <Link to={`/${link}`} className="flex"><FiUser size='20' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition hidden md:inline duration-500'> User</span></Link> : <Link to='/login' className="flex"><FiUser size="20" className='text-lime-500'/> <span className='text-sm hidden md:inline hover:text-lime-500 transition duration-500'> User</span></Link>}</li>
                    </ul>
                </div>
            </nav>



            

            <nav className='flex justify-between relative z-20 px-3 md:px-7 py-5 drop-shadow-lg bg-white text-black'>
                <div className='basis-6/12 md:basis-3/12'>
                    <div className='flex justify-center'><Link to='/' className="flex md:w-6/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-4 md:mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></div>

                </div>
                <div className='md:basis-5/12 pt-3 hidden md:block'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-4/5 rounded-l h-10 border border-lime-500 focus:outline-none px-2' placeholder="product name"/>
                        <button onClick={handleSearch} className='w-1/5 bg-lime-500 rounded-r h-10 text-white transition duration-500'>search</button>
                    </form>
                </div>
                <div className='basis-4/12 pt-5'>
                    <ul className='flex justify-between md:justify-around space-x-3 md:space-x-4'>
                        <li onClick={showSearch}><FiSearch size='20' className='text-lime-500 md:hidden'/></li>
                        <li className='relative flex' onMouseEnter={()=>setShowSupourt1(true)} onMouseLeave={()=>setShowSupourt1(false)}>
                           
                            <BsHeadset size='20' className='text-lime-500'/>
                            <span className='text-sm hover:text-lime-500 transition duration-500 hidden md:flex'> Support &nbsp;<FiChevronDown /></span>
                            {showSupourt1 &&
                                <div className='absolute z-[80000000] w-[140px] top-5 -left-10 md:left-0 p-3 rounded shadow bg-white text-black'>
                                    <div className="flex">
                                        <FiPhone size={20} className='text-lime-500'/> phone
                                    </div>
                                    <hr className='my-1'/>
                                    <div className="flex">
                                        <FiMail size={20} className='text-lime-500'/> Whatsapp
                                    </div>
                                </div>
                            }
                            
                        </li>
                        <li onClick={handleCartState} className='relative hover:cursor-pointer flex'><FiShoppingCart size='20' className='text-lime-500'/><span className='bg-lime-500 absolute -top-2 -right-[2px] md:right-[22px] w-4 h-4 text-white text-center text-[9px] rounded-[50%]'>{cartCount?.totalQty}</span> <span className='text-sm hidden md:inline transition duration-500 hover:text-lime-500'> Cart</span></li>
                        <li>{id!== ''? <Link to={`/${link}`} className="flex"><FiUser size='20' className='text-lime-500'/> <span className='text-sm hover:text-lime-500 transition hidden md:inline duration-500'> User</span></Link> : <Link to='/login' className="flex"><FiUser size='20' className='text-lime-500'/> <span className='text-sm hidden md:inline hover:text-lime-500 transition duration-500'> User</span></Link>}</li>
                    </ul>
                </div>
            </nav>


            <Cart open={isOpen} changeOpenState ={handleCartState}/>

            {showSearchModal && createPortal(
                <div className='fixed top-0 left-0 w-full h-full bg-slate-100 z-[1000000000]'>
                    <form>
                        <button type='button' onClick={showSearch} className='bg-lime-500 h-10 w-1/12'><FiArrowLeft/></button>
                        <input type="text" value={search} onChange={handleChange} className='w-10/12 rounded-l h-10 focus:outline-none px-2'/>
                        <button onClick={handleSearch} className='w-1/12 bg-lime-500 h-10 text-white  hover:bg-lime-700 transition duration-500'><FiSearch/></button>
                    </form>
                </div>, document.body
                )
            }
           
        </>
    )
}
export default Navbar