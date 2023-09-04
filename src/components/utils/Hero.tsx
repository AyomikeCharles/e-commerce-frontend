import img1 from './images/model1.jpg';
import phone from './images/phone.jpg';

import { VscArrowSmallRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';


const Hero: React.FC = ():JSX.Element=>{
    
    const [frames, setFrames] = useState(true)

    const toggle = () => {
        setFrames(current => (!current))
    }

    useEffect(()=>{
        const interval = setInterval(toggle, 5000)
        return () => clearInterval(interval)
    }, [frames])
    

    return(
        <>

        <section>
         <AnimatePresence mode='wait'>
            { frames ?
            <motion.div 
                key='frame1'
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.6}}
                className='w-full bg-no-repeat bg-cover relative h-[340px] md:h-[550px]' 
                style={{backgroundImage:`url(${img1})`}}
                >
                <motion.div className='md:w-1/2 px-8 py-16 md:p-16 content-center'>
                    <motion.h6 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.6}} className='text-purple-200 my-3 md:my-7'>SUMMER COLLECTION</motion.h6>
                    <motion.h2 initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.5, delay:0.6}} className='text-2xl md:text-3xl font-extrabold my-3 md:my-7'>Fall - Winter <br/> Collection 2023</motion.h2>
                    <motion.p initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.5, delay:0.6}} className='text-white my-3 md:my-7'>Lorem ipsum dolor sit amet, consectetur adipisc et dolore magna aliqua. Ut enim ad minim veniam</motion.p>
                    <motion.button initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.6}} className='bg-black p-2 rounded text-white my-3 md:my-7 flex'>SHOP NOW <VscArrowSmallRight size={24}/></motion.button>
                </motion.div>
                <motion.div className='flex justify-between absolute w-full px-2 md:px-5 top-[45%]'>
                    <motion.button onClick={toggle}> <AiFillCaretLeft size={25}color='gray'/></motion.button>
                    <motion.button onClick={toggle}> <AiFillCaretRight size={25} color='gray'/> </motion.button>
                </motion.div>
            </motion.div>
            :
            <motion.div 
                key='frame2'
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{duration:0.6}}
                className='w-full bg-no-repeat bg-cover relative h-[340px] md:h-[550px]' 
                style={{backgroundImage:`url(${phone})`}}
                >
                <motion.div className='md:w-1/2 px-8 py-16 md:p-16 content-center'>
                    <motion.h6 initial={{opacity:0, y:-20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.6}} className='text-purple-200 my-3 md:my-7'>SUMMER COLLECTION</motion.h6>
                    <motion.h2 initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.5, delay:0.6}} className='text-2xl md:text-3xl font-extraboldmy-3 md:my-7'>Fall - Winter <br/> Collection 2023</motion.h2>
                    <motion.p initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.5, delay:0.6}} className='text-white my-3 md:my-7'>Lorem ipsum dolor sit amet, consec labore et dolore magna aliqua. Ut enim ad minim veniam</motion.p>
                    <motion.button initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5, delay:0.6}} className='bg-black p-2 rounded text-white my-3 md:my-7 flex'>SHOP NOW <VscArrowSmallRight size={24}/></motion.button>
                </motion.div>
                <motion.div className='flex justify-between absolute w-full px-2 md:px-5 top-[45%]'>
                    <motion.button onClick={toggle}> <AiFillCaretLeft size={25}color='gray'/></motion.button>
                    <motion.button onClick={toggle}> <AiFillCaretRight size={25} color='gray'/> </motion.button>
                </motion.div>
            </motion.div>
            }
         </AnimatePresence>
            

        </section>

        </>
    );
};
export default Hero;