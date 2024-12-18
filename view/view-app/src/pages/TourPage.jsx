import React from 'react'
import '../styles/pages/TourPage.css'
import { Link } from 'react-router-dom'

import { OrderCard } from '../components/OrderCard'

function qbutton(props) {
	return (
		<div className='quantitybutton'>
			<input type='number' value></input>
			<a href='#'>
				<div
					className='PriceBtn'
					id={props.id}
					onClick={(e) => props.handler(e)}>
					{props.cost + ' ₽ ' + props.value}
				</div>
			</a>
		</div>
	)
}

export const TourPage = (props) => {
	let i = 0
	const pricelist = []
	i = 0

	/*

	const handleClick = event => {
		addToTray(props.element.prices[parseInt(event.currentTarget.id)].id)
		console.log(props.element.prices[parseInt(event.currentTarget.id)].id)
		setFlag(!flag)
		
	}
	*/
	const handleClick = async (e) => {
		//console.log(await Order(props.element.prices[parseInt(e.target.id)].id))
	}

	props.element.prices.forEach((element) => {
		pricelist.push(
			<div className='TourPrice'>
				<div className='TourPriceLeft'>
					<div className='TourPriceDates'>
						{element.date}, {element.duration} ночей
					</div>
					<div className='Room'>{element.type}</div>
				</div>
				<OrderCard
					cost={element.cost}
					baseQuantity={0}
					visibility={'hidden'}
					id={element.id}></OrderCard>
			</div>
		)
		i++
	})
	i = 0
	return (
		<div className='TourPage'>
			{' '}
			<div className='Page'>
				<div className='TourName'>{props.element.name}</div>
				<div className='TourLocation'>{props.element.location}</div>
				<img className='TourImage' src={props.element.imagePath}></img>
				<div className='TourDescription'>
					{props.element.description}
				</div>
				<div className='Prices'>
					<div className='PricesHeader'>
						Туры в {props.element.name}
					</div>
					<div className='TourPrices'>{pricelist}</div>
				</div>
				<Link className='PriceBtn' to='/Catalogue'>
					Вернуться
				</Link>
				<div style={{ height: '10px' }}></div>
			</div>
		</div>
	)
}
