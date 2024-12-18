import '../styles/pages/Catalogue.css'
import { TourCard } from '../components/TourCard'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { TourPage } from './TourPage'
import { useState } from 'react'

import axios from 'axios'

import { APIAdress } from '../components/api'

let tours = []

async function getTours() {
	await axios({
		method: 'get',
		url: `http://127.0.0.1:7171/GetAllToursWithPrices`,
		withCredentials: false,
		params: {},
	})
		.then((response) => {
			console.log(response)

			tours = response.data
		})

		.catch(function (error) {
			if (error.response) {
				// get response with a status code not in range 2xx
				console.log(error.response.data)
				console.log(error.response.status)
				console.log(error.response.headers)
			} else if (error.request) {
				// no response
				console.log(error.request)
				// instance of XMLHttpRequest in the browser
				// instance ofhttp.ClientRequest in node.js
			} else {
				// Something wrong in setting up the request
				console.log('Error', error.message)
			}
			console.log(error.config)
		})
}

await getTours()

console.log(tours)
const cardprops = []
/*
const cardprops = [
	{
		page: '1',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/22/29/4e/5a5165e61f59d6f45172068c879a4281d4871bea6fc56fe9f6b0ff8f02/6036930c6aaf2.jpeg',
		date: '04.12',
		duration: '7',
		prices: [
			{ price: 117742, type: 'Standart Room' },
			{ price: 119189, type: 'Eco Room' },
			{ price: 127865, type: 'Superior' },
		],
		name: 'Orange Palace Spa',
		location: 'Турция, Сиде',
		description:
			'Отель расположен в 57 км от аэропорта, в 7 км от г. Сиде, примерно в 500 м от моря.',
		cat: 'Рекомендуем',
	},
	{
		page: '2',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/c8/11/52/06979fdb8eea1581458cf61185068927c5d1ef53f5c3ca0442297cb5b4/5e8b12c078bb9.jpg',
		date: '18.12',
		duration: '11',
		prices: [
			{ price: 207129, type: 'Standard Room' },
			{ price: 272027, type: 'Standard Room' },
		],
		name: 'Jiraporn Hill Resort Patong',
		location: 'Пхукет, Таиланд',
		description: (
			<p>
				Отель состоит из двух 6-ти этажных зданий (есть 2 лифта).
				<br />
				Расположен в 40 км от Международного аэропорта Пхукета и 1 км от
				пляжа Патонг.
				<br />
				При заезде в отель депозит не взимается.
				<br />
				ВНИМАНИЕ! В номерах отеля курение запрещено
			</p>
		),
		cat: 'Рекомендуем',
	},
	{
		page: '3',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/be/a0/94/f1c40f136f87a4d1b4b0d37e5803b2fe311b9e7b160f7d64771e1e625e/5a3283fee3530.png',
		date: '18.12',
		duration: '11',
		prices: [
			{ price: 235324, type: 'Superior' },
			{ price: 290767, type: 'Standard Room' },
		],
		name: 'Baan Katha Maytha',
		location: 'Пхукет, Таиланд',
		description: (
			<p>
				Отель состоит из двух 6-ти этажных зданий (есть 2 лифта).
				<br />
				Расположен в 40 км от Международного аэропорта Пхукета и 1 км от
				пляжа Патонг.
				<br />
				При заезде в отель депозит не взимается.
				<br />
				ВНИМАНИЕ! В номерах отеля курение запрещено
			</p>
		),
		cat: 'Рекомендуем',
	},
	{
		page: '4',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/59/c2/1e/01ef14c6b0136825a8a46ebf8b7e6d9fe1dd840ae9ee69a9d28f76cc88/645cd20084743.jpg',
		date: '18.12',
		duration: '11',
		prices: [
			{ price: 253533, type: 'Deluxe Room' },
			{ price: 305719, type: 'Deluxe Room' },
		],
		name: 'Jiraporn Hill Resort Patong',
		location: 'Пхукет, Таиланд',
		description: (
			<p>
				Рекомендуем отель для молодежного отдыха и отдыха семейными
				парами. Отель расположен через дорогу от пляжа Карон.
				<br />
				Рекомендуем отель для молодежного отдыха и отдыха семейными
				парами. Отель расположен через дорогу от пляжа Карон.
				<br />
				Расстояние до пляжа составляет 20 м.
			</p>
		),
		cat: 'Рекомендуем',
	},
	{
		page: '5',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/20/72/d0/d35a632bf4fe39a5095c22a8ff6c526ee8f1209f0a4aacc4fe20768218/5bbb62f0d4b08.PNG',
		date: '15.12',
		duration: '8',
		prices: [{ price: 274862, type: 'Superior' }],
		name: 'Karon Village Hotel',
		location: 'Пхукет, Таиланд',
		description: (
			<p>
				Отель расположен в 1000 м от пляжа. Состоит из 5 основных
				корпусов.
			</p>
		),
		cat: 'Рекомендуем',
	},
	{
		page: '6',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/b9/39/ce/cfb6783d8a754ade620799c590d2ece0ca34bc03ad0e809afde323be3b/6654825d95037.jpg',
		date: '22.11',
		duration: '8',
		prices: [{ price: 274862, type: 'Superior' }],
		name: '84 Хостел',
		location: 'Россия, Казань',
		description: (
			<p>
				Хостел расположен в 1000 м от пляжа. Состоит из 5 основных
				корпусов.
			</p>
		),
		cat: 'In',
	},
	{
		page: '7',
		image: 'https://pic-h.cdn.pegast.ru/getimage-h/thumbh338/1a/34/6f/b1d7e0f06f5bf14704f48622065b04815612947a6bb66126cbb1c56aae/66277e13e10c9.jpg',
		date: '15.12',
		duration: '8',
		prices: [{ price: 274862, type: 'Superior' }],
		name: 'Твид Оренбург',
		location: 'Россия, оренбург',
		description: (
			<p>
				Отель расположен центре города. Состоит из 2 основных корпусов.
			</p>
		),
		cat: 'In',
	},
]
*/
getTours()

const cards = []

const routes = []

tours.forEach((element) => {
	let cardinfo = element.prices.sort((a, b) => parseInt(a.cost - b.cost))
	console.log(cardinfo)

	cards.push(
		<TourCard
			page={element.id}
			image={element.imagePath}
			date={cardinfo[0].date}
			duration={cardinfo[0].duration}
			price={cardinfo[0].cost}
			name={element.name}
			location={element.location}
			description={element.description}
			cat={element.cathegory}
		/>
	)
	routes.push(
		<Route
			path={'/Catalogue/' + element.id}
			element={<TourPage element={element} cardinfo={cardinfo} />}
		/>
	)
})

cardprops.forEach((element) => {
	cards.push(
		<TourCard
			page={element.page}
			image={element.image}
			date={element.date}
			duration={element.duration}
			price={Math.min.apply(
				Math,
				element.prices.map(function (val) {
					return val.price
				})
			)}
			name={element.name}
			location={element.location}
			description={element.description}
			cat={element.cat}
			cardinfo={element.prices}
		/>
	)
	routes.push(
		<Route
			path={'/Catalogue/' + element.page}
			element={<TourPage props={element} />}></Route>
	)
})

cardprops.forEach((element) => {
	//	routes.push(
	//		<Route
	//			path={'/Catalogue/' + element.page}
	//			element={<TourPage props={element} />}></Route>
	//	)
})

let i = 0
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
delete axios.defaults.headers.common['Authorization']

const Catalogue = () => {
	const [searchTerm, setSearchTerm] = useState('')
	const [searchResults, setSearchResults] = useState([])
	const [cat, setCat] = useState('Рекомендуем')

	const handleChange = (e) => {
		setSearchTerm(e.target.value)
		console.log(searchTerm)
	}

	const handleClick = (e) => {
		document.getElementById('Все').className =
			'button-cathegories--inactive'
		document.getElementById('Рекомендуем').className =
			'button-cathegories--inactive'
		document.getElementById('Семейные туры').className =
			'button-cathegories--inactive'
		document.getElementById('Горящие туры').className =
			'button-cathegories--inactive'
		document.getElementById('Pegas Select').className =
			'button-cathegories--inactive'
		document.getElementById('Pegas Swandor').className =
			'button-cathegories--inactive'
		e.target.className = 'button-cathegories--active'
		setCat(e.target.value)
	}

	React.useEffect(() => {
		const results = cards.filter(
			(card) =>
				(card.props.name
					.toLowerCase()
					.includes(searchTerm.toLowerCase()) ||
					card.props.location
						.toLowerCase()
						.includes(searchTerm.toLowerCase())) &&
				(card.props.cat == cat || cat == 'Все')
		)
		setSearchResults(results)
	}, [searchTerm, cat])

	return (
		<div className='CatalogueContainer'>
			<div className='Page'>
				<div className='Upper'>
					<h1>Лучшие туры</h1>
					<input
						type='text'
						placeholder='Search'
						value={searchTerm}
						onChange={(element) => (
							handleChange(element), console.log(cat)
						)}
					/>
					<div></div>
				</div>

				<div className='cats'>
					<input
						type='button'
						value='Все'
						className={'button-cathegories--inactive'}
						onClick={(element) => handleClick(element)}
						id='Все'
					/>
					<input
						type='button'
						value='Рекомендуем'
						className={'button-cathegories--active'}
						onClick={(element) => handleClick(element)}
						id='Рекомендуем'
					/>
					<input
						type='button'
						value='Семейные туры'
						className={'button-cathegories--inactive'}
						onClick={(element) => handleClick(element)}
						id='Семейные туры'
					/>
					<input
						type='button'
						value='Горящие туры'
						className={'button-cathegories--inactive'}
						onClick={(element) => handleClick(element)}
						id='Горящие туры'
					/>
					<input
						type='button'
						value='Pegas Select'
						className={'button-cathegories--inactive'}
						onClick={(element) => handleClick(element)}
						id='Pegas Select'
					/>
					<input
						type='button'
						value='Pegas Swandor'
						className={'button-cathegories--inactive'}
						onClick={(element) => handleClick(element)}
						id='Pegas Swandor'
					/>
				</div>

				<div className='ToursWrapper'>
					{searchResults.map((item) => (
						<>{item}</>
					))}
				</div>
			</div>
			<Routes>{routes}</Routes>
		</div>
	)
}
export { Catalogue, routes, cardprops }
