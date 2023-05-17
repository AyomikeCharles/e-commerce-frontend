import gadgetImg from './images/gadget.jpg';
import freedv from './images/freedv.jpeg';
import SlideShow from "./Carousel";
import { FiAlignJustify } from "react-icons/fi"
import categories from '../../res/categoriesService';
import { Message } from '../../slicer/authSlice';
import { AxiosError } from "axios";
import { Link } from 'react-router-dom'
import Loading from './Loading';

export interface Cats {
    _id:string, 
    title:string, 
    icon:string,
    description:string
}


const Hero: React.FC = ():JSX.Element=>{

    const { isError, isLoading, error, data, isSuccess } = categories.useGetCategories()
    
    const err = error as AxiosError;
    let errMessage = err?.response?.data as Message

    if(isLoading){
        return <Loading/>
    }
    if(isLoading)return <Loading/>
    if(isError){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>{errMessage? errMessage.message : 'Network Error'}</div></div>
    }
    if(isSuccess && data.hasOwnProperty('stack') ){
        return <div className="fixed w-full h-full top-0 left-0 bg-black/90 flex justify-center z-30"><div className="bg-white rounded w-11/12 md:w-[30%] h-[30%] mt-36 pt-10 text-center"><hr className="mb-5"/>Network Error</div></div>
    }

    const cAtegories = data as Cats[]


    return(
        <>

        <section className='px-5 py-10 hidden lg:block'>
            <div className='flex'>
                <div className='basis-3/12 xl:basis-1/3'>

                <ul className="bg-white shadow-md rounded py-3">
                    
                    { isSuccess &&
                    
                    cAtegories?.map((cats:Cats,i:number)=> 
                        {
                            if(i <= 8 ){
                                return (
                                <li key={i} className="my-2 hover:text-lime-500 flex"><Link to={`/category/${cats._id}`}><div className="basis-3/4 flex ml-4"><img className='mr-1 w-6 h-7' loading='lazy' src={cats.icon} alt={`${cats.title} category icon`} /> {cats.title}</div></Link></li>
                                )
                            }
                            return null
                        })
                    
                    }

                    <li className="ml-5 text-lime-500"><Link to='/categories' >View All</Link></li>
                </ul>

                </div>
                <div className='basis-9/12 w-9/12 xl:basis-2/3 xl:w-2/3'>
                    <div className='w-11/12 mx-auto mb-5'>
                        <SlideShow></SlideShow>
                    </div>
                </div>
                <div className='basis-1/3 hidden xl:inline'>
                    <div className='rounded'>
                        <div className=''>
                            <img className="rounded-t w-11/12" src={freedv} alt=''/>
                        </div>
                        <div>
                            <img className="rounded-b w-11/12" src={gadgetImg} alt=''/>
                        </div>            
                    </div>
                </div>
            </div>
        </section>

        <section className='block lg:hidden'>
            
            <div className='w-11/12 mx-auto my-7'>
                <SlideShow></SlideShow>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-4 gap-3 mx-2 text-sm">
                    <div className="text-center">
                        <Link to='/categories' >
                            <div className="bg-white px-1 py-2 rounded">
                                <div className='flex justify-center'>
                                    <FiAlignJustify size='30'/>
                                </div>
                                <div>
                                    See all
                                </div>
                            </div>
                        </Link>
                    </div>
                {isSuccess &&
                    cAtegories?.map((cats:Cats, i:number)=>{
                        if(i <= 6 ){
                            return(
                                <Link key={i} to={`/category/${cats._id}`}>
                                <div className="text-center">
                                    
                                    <div className="bg-white px-1 py-2 rounded">
                                        <img className='mx-auto w-7 h-8' loading='lazy' src={cats.icon} alt={`${cats.title} category icon`} /> 
                                        <div className='truncate ...'>
                                            {cats.title}
                                        </div>
                                    </div>
                                </div>
                                </Link>
                            )
                        }

                        return null
                        
                    })
                }
                </div>
            </div>

        </section>

        </>
    );
};
export default Hero;


