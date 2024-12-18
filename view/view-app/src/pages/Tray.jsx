import React from 'react'
import '../styles/pages/TourPage.css'
import { Link } from 'react-router-dom'

import { OrderCard } from '../components/OrderCard'
import axios from 'axios'
import '../styles/pages/Tray.css'

let data = []
let tours = []
async function getOrders() {
	await axios
		.post(`http://127.0.0.1:7171/AllOrders`, {
			email: localStorage.getItem('email'),
		})
		.then((r) => {
			data = r.data
			return r
		})
}

async function getTours() {
	await axios.get('http://127.0.0.1:7171/GetAllToursWithPrices').then((t) => {
		tours = t.data
	})
}

let r = 0
async function getSumOfOrders() {
	await axios
		.post('http://127.0.0.1:7171/OrdersCost', {
			email: localStorage.getItem('email'),
		})
		.then((t) => {
			r = t.data
		})
}
await getSumOfOrders()
const cards = []
await getTours()

await getOrders()
console.log(data)

const Tray = (props) => {
	const [price, setPrice] = React.useState(0)

	//setPrice(getSumOfOrders)
	React.useEffect(() => {
		//setPrice(getSumOfOrders())
	})
	data.forEach((element) => {
		cards.push(
			<div className='TourPrice'>
				<div className='TourPriceLeft'>
					<div className='TourPriceDates'>
						<p>
							{element.tour.name}, {element.tour.location}
						</p>

						<p>
							{element.price.date}, {element.price.duration} ночей
						</p>
					</div>
					<div className='Room'>{element.price.type}</div>
				</div>
				<OrderCard
					cost={element.price.cost}
					id={element.price.id}
					baseQuantity={element.quantity}
					handler
					visibility={'visible'}></OrderCard>
			</div>
		)
	})
	data = []
	const Price = (props) => {
		if (props.cards.length == 0) {
			return <p>Корзина пуста</p>
		} else {
			return (
				<a href='#'>
					<div className='submit'>Забронировать</div>
				</a>
			)
		}
	}
	return (
		<div className='TrayContainer'>
			<div className='Page'>
				<h1>Корзина</h1>
				{cards}
				<p>{r} ₽</p>
				<Price cards={cards}></Price>
			</div>
		</div>
	)
}

export { Tray }
