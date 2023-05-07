import menFashion from './images/menfashion.webp';
import electronics from './images/electronics.webp';
import fashion from './images/fashion.webp';

//swiper component and swiper css
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useRef } from 'react';

const SlideShow = ():JSX.Element=>{

    const slides = useRef<SwiperRef>(null)

    return(
        <>

            <Swiper
                modules={[Autoplay]}
                slidesPerView={1}
                ref = {slides}
                autoplay = {{
                delay:2000,
                pauseOnMouseEnter:true,
                }}
            >
                <SwiperSlide>
                    <div>
                        <img className="rounded" src={fashion} alt="carousel one" />
                    </div>
                </SwiperSlide>
                
                <SwiperSlide>
                    <div>
                        <img className="rounded" src={electronics} alt="carousel two" />
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div>
                        <img className="rounded" src={menFashion} alt="carousel three" />
                    </div>
                </SwiperSlide>

            </Swiper>
        </>
    )
};

export default SlideShow;