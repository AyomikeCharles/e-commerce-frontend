import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope, faMoon } from '@fortawesome/free-solid-svg-icons';
import shopping from '../../utils/images/shopping.jpg';


const AHeader = () =>{
    return(
        <>
            <nav className="w-full md:flex justify-between px-10 py-5 bg-slate-300 dark:bg-slate-800 dark:text-white">
                <div className='mb-3 md:mb-0'>
                    <form>
                    <div className="flex">
                        <input 
                            id="asearch"
                            type="text"  
                            required 
                            name='password'
                            className="border p-2 rounded-l focus:outline-none w-full bg-slate-50 dark:bg-slate-400"  
                        />
                        <button className="bg-slate-50 rounded-r px-1 dark:bg-slate-400">Search</button>
                    </div>
                    </form>
                </div>
                <div>
                    <ul className="flex justify-center md:justify-end">
                        <li className='pt-2 relative mx-3'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faBell} size='lg'  /></span><span className='bg-white absolute -top-0 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>4</span></li>
                        <li className='pt-2 relative mx-3'><span className='text-sm hover:text-lime-500 transition duration-500 '><FontAwesomeIcon icon={faEnvelope} size='lg' /></span><span className='bg-white absolute -top-0 -right-[2px] w-4 h-4 text-black text-center text-[9px] rounded-[50%]'>8</span></li>
                        <li className='pt-2 mx-3'><span className='text-sm hover:text-lime-500 transition duration-500'><FontAwesomeIcon icon={faMoon} size='lg'/></span></li>
                        <li className='mx-3 w-3/12'><img className='border rounded-[50%] w-[40px] h-[40px]' src={shopping} alt='avater'/></li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default AHeader;