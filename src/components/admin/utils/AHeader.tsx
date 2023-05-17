import { FiMenu, FiBell, FiUser } from "react-icons/fi"
import MobileAside from './MobileAside';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../utils/images/logo.png'


const AHeader = () =>{

    const [Open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [search, setSearch] = useState('')


    const handleAsideState = () => {
        setOpen(!Open)
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
            <nav className="w-full bmd:flex justify-between p-5 bg-gray-50">
                <div className='block bmd:hidden mb-3 bmd:mb-0'>
                    <div className='flex justify-between bmd:hidden'>
                        <div className='w-full flex'>
                            <span className='pt-2 mr-3' onClick={handleAsideState}><FiMenu size='30'  /></span>
                            <span><Link to='/' className="flex w-8/12 md:w-6/12"><img className='w-4/12' loading='lazy' src={logo} alt="logo"/><span className="mt-4 md:mt-5 font-bold">best<span className="text-lime-500">Se</span>ller</span></Link></span>


                        </div>
                        
                        <ul className="flex justify-center bmd:justify-end">
                            <li className='relative mx-5 pt-1'><span className='text-sm hover:text-lime-500 transition duration-500'><FiBell size='25' className='text-lime-500' /></span><span className='bg-white absolute -top-1 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                        </ul>
                    </div>
                </div>
                <div className='md:w-6/12'>
                    <form>
                        <input type="text" value={search} onChange={handleChange} className='w-5/6 border border-lime-500 text-black px-2 focus:outline-none rounded-l h-10' placeholder="product name"/>
                        <button onClick={handleSearch} className='w-1/6 bg-lime-500 rounded-r h-10 text-sm text-white'>search</button>
                    </form>
                </div>
                    <ul className="hidden bmd:flex bmd:justify-end mt-2">
                        <li className='relative mx-3'><span className='text-sm hover:text-lime-500 transition duration-500'><FiBell size='25' className='text-lime-500' /></span><span className='bg-white absolute -top-2 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>0</span></li>
                        <li className='relative mx-3'><Link to='/admin/profile'><FiUser size='25' className='text-lime-500' /></Link></li>
                       
                    </ul>
                
            </nav>

            <aside className='bmd:hidden'>
                <MobileAside open={Open} changeOpenState ={handleAsideState}/>
            </aside>
        </>
    )
}

export default AHeader;