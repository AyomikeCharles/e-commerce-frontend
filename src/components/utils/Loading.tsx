import logo from './images/logo.png'

const Loading = () =>{
    return(
        <>
            <div className=" top-0 left-0 flex justify-center z-[1000000] bg-white/50 pt-56">
                <span className='animate-pulse'>
                    <span className='flex animate-bounce justify-center'><img className='w-3/12' loading='lazy' src={logo} alt="logo"/><span className="mt-6 md:mt-10 text-2xl font-bold">best<span className="text-lime-500">Se</span>ller</span></span>
                </span>
            </div>
        </>
    )
}

export default Loading