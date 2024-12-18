import {
	Navigation,
	Pagination,
	A11y,
	Mousewheel,
	Autoplay,
	Keyboard,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import '../styles/components/Promo.css'

//import images

import b01 from '../img/PromoSwiper/1.jpg'
import b02 from '../img/PromoSwiper/2.jpg'
import b03 from '../img/PromoSwiper/3.jpg'
import { useState } from 'react'
import axios from 'axios'

/*
const swiper = new Swiper('.promoSwiper', {
	modules: [Navigation, Pagination],
	spaceBetween: 30,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: 'swiper-pagination',
		type: 'bullets',
		clickable: true,
		enabled: true,
		dynamicBullets: true,
	},
	mousewheel: true,
	keyboard: true,
	autoHeight: true,
	autoplay: true,
	centeredSlides: true,
	loop: true,
	height: 360
	autoplay: {
		sticky: true,
	},
})*/
let slideIndex = 0

let images = [b01, b02, b03]
let links = [
	'/Catalogue/c335cda1-31db-4042-82c1-1d4cc90505e2',
	'/Catalogue/5c649b6f-a268-4f40-ac9e-f8f90e9d48ff',
	'/Catalogue/b3f88579-c9cf-4960-8854-b9d059354c15',
]

let tours = []
async function getTours() {
	axios({
		method: 'get',
		url: `http://127.0.0.1:7171/GetAllToursWithPrices`,
		withCredentials: false,
		params: {},
	})
}
await getTours()
console.log(tours)
const Promo = () => {
	function useForceUpdate() {
		const [, setToggle] = useState(false)
		return () => setToggle((toggle) => !toggle)
	}
	const forceUpdate = useForceUpdate()
	return (
		<section className='Promo'>
			<div className='PromoContainer'>
				<a class='PromoLink' href={links[slideIndex]}>
					<Swiper
						modules={[
							Navigation,
							Pagination,
							A11y,
							Autoplay,
							Keyboard,
							Mousewheel,
						]}
						spaceBetween={0}
						slidesPerView={1}
						navigation
						keyboard={{
							enabled: true,
						}}
						//loop={{ enabled: true }}
						pagination={{ clickable: true }}
						onSwiper={(swiper) => console.log(swiper.activeIndex)}
						onSlideChange={(swiper) => (
							(slideIndex = swiper.activeIndex), forceUpdate()
						)}
						mousewheel={{
							enabled: true,
						}}
						autoplay={{
							enabled: true,
							delay: 10000,
							pauseOnMouseEnter: true,
							waitForTransition: false,
						}}>
						<SwiperSlide>
							<img
								className='PromoImg'
								src='https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/f8/8f/60/8bc227e3e887b231a507b1ca110b2162a6196ccadeef225aad050e6829/65cc9ced2fdea.jpg'
								alt='b01'
							/>
						</SwiperSlide>
						<SwiperSlide
							onSlideChange={(isActive) => {
								if (isActive) slideIndex = 1
							}}>
							<img
								className='PromoImg'
								src='https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/22/29/4e/5a5165e61f59d6f45172068c879a4281d4871bea6fc56fe9f6b0ff8f02/6036930c6aaf2.jpeg'
								alt='b02'
							/>
						</SwiperSlide>
						<SwiperSlide
							onSlideChange={(isActive) => {
								if (isActive) slideIndex = 1
							}}>
							<img
								className='PromoImg'
								src='https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/c8/11/52/06979fdb8eea1581458cf61185068927c5d1ef53f5c3ca0442297cb5b4/5e8b12c078bb9.jpg'
								alt='b03'
							/>
						</SwiperSlide>
					</Swiper>
				</a>
			</div>
		</section>
	)
}

export { Promo }
