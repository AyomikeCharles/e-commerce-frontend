import menFashion from './images/menfashion.webp';
import electronics from './images/electronics.webp';
import fashion from './images/fashion.webp';

//swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';

const Slides = ():JSX.Element=>{
    const slides = useRef<SwiperRef>(null)

    
    return(
        <>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={2}
                ref = {slides}
                autoplay = {{
                delay:2000,
                pauseOnMouseEnter:true,
                }}
                >
                <SwiperSlide>
                    <div>
                        <img className="rounded h-[150px]" src={fashion} alt="carousel one" loading='lazy'/>
                    </div>
                </SwiperSlide>
                
                <SwiperSlide>
                    <div>
                        <img className="rounded h-[150px]" src={electronics} alt="carousel two" loading='lazy'/>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                        <img className="rounded h-[150px]" src={menFashion} alt="carousel three" loading='lazy'/>
                    </div>
                </SwiperSlide>

            </Swiper>
            
        </>
    )
};

export default Slides;