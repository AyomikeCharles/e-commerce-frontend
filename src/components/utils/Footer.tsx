import { Link } from "react-router-dom";
import { BsMailbox, BsTelephone } from "react-icons/bs";
import { VscLocation } from "react-icons/vsc";
import Logo from "./Logo";

const Footer = ():JSX.Element=>{
    return(
        <>  

            <footer className="bg-neutral-800 text-white lg:text-left">

            <div className="mx-6 md:mx-11 py-10">
                <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
             
                <div className='flex '>
                    <div>

           
                       <Logo/>
        
                    <p className="text-gray-400 mt-4">
                        Here you can use rows and columns to organize your footer
                        content. Lorem ipsum dolor sit amet
                    </p>
                    </div>

                </div>
                    
                <div className="text-gray-400">
                    <h6 className="mb-2 font-semibold uppercase text-white">
                    Categories
                    </h6>
                    <p className="mb-2">
                    <Link to="#!" className="hover:text-lime-500">Men</Link>
                    </p>
                    <p className="mb-2">
                    <Link to="#!" className="hover:text-lime-500">Women</Link>
                    </p>
                    <p className="mb-2">
                    <Link to="#!" className="hover:text-lime-500">Children</Link>
                    </p>
                    <p className="mb-2">
                    <Link to="#!" className="hover:text-lime-500">Electronics</Link>
                    </p>
                    <p className="mb-2">
                    <Link to="#!" className="hover:text-lime-500">More</Link>
                    </p>
                </div>
                <div className="text-gray-400">
                    <h6
                    className="mb-4 text-white font-semibold uppercase">
                    Contact
                    </h6>
                    <p className="mb-2 flex space-x-2 "><VscLocation size={22}/> <span>New York, NY 10012, US</span></p>
                    <p className="mb-2 flex space-x-2 "><BsMailbox size={22}/> <span>info@example.com</span></p>
                    <p className="mb-2 flex space-x-2 "><BsTelephone size={20}/> <span>+234 8140231279</span></p>
                </div>


                <div className="text-gray-400">
                    <h6
                    className="mb-4 text-white font-semibold uppercase">
                    NewsLetter
                    </h6>
                    <p className="mb-2 flex space-x-2">Be the first to know about new arrivals, look books, sales & promos!</p>
                    <input className="border-b-2 bg-transparent w-full focus:outline-none focus:border-b-purple-500 transition-all duration-200" placeholder="your email"/>
                
                </div>
                </div>
            </div>
            <div className="bg-neutral-900 p-6 text-center">
                <span>© 2023 Copyright:</span>
                <Link className="font-semibold hover:text-lime-500 dark:text-neutral-400"
                to="https://ayomikecharles.github.io/portfolio/"> Charles Ayomike</Link>
            </div>
            </footer>
        </>
    )
}
export default Footer;