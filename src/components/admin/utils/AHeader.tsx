import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faBell, faMoon } from '@fortawesome/free-solid-svg-icons';
import MobileAside from './MobileAside';
import { useState } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../utils/images/logo.png'
const AHeader = () =>{

    const [isOpen, setIsOpen] = useState(false);


    const handleAsideState = () => {
        setIsOpen(!isOpen)
    } 

    return(
        <>
            <nav className="w-full bmd:flex justify-between px-10 py-5 bg-slate-800 text-white">
                <div className='mb-3 bmd:mb-0'>
                    <div className='flex justify-between bmd:hidden'>
                        <span><Link to='/'><img className='w-24 h-16' loading='lazy' src={logo} alt="logo"/></Link></span>

                        <span onClick={handleAsideState}><FontAwesomeIcon icon={faBars} size='lg'  /></span>
                    </div>
                </div>
                <div>
                    <ul className="flex justify-center bmd:justify-end">
                        <li className='pt-2 relative mx-3'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faBell} size='lg'  /></span><span className='bg-white absolute -top-0 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                        <li className='pt-2 mx-3'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faMoon} size='lg'/></span></li>
                    </ul>
                </div>
            </nav>
            <aside className='bmd:hidden'>
                <MobileAside open={isOpen} changeOpenState ={handleAsideState}/>
            </aside>
        </>
    )
}

export default AHeader;