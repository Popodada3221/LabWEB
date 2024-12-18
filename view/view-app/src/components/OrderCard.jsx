import axios from 'axios'
import React from 'react'

async function Order(priceId) {
	let resp = 0
	await axios
		.post('http://127.0.0.1:7171/Orders', {
			email: localStorage.getItem('email'),
			priceId: priceId,
		})
		.then((a) => (resp = a.data.q))
	console.log(resp)
	if (resp) return resp
	else return 0
}

async function addToTray(priceid) {
	await axios
		.post('http://127.0.0.1:7171/AddToTray', {
			email: localStorage.getItem('email'),
			priceId: priceid,
		})
		.then(console.log('added'))
}
async function deleteFromTray(priceid) {
	await axios
		.post('http://127.0.0.1:7171/DeleteOrder', {
			email: localStorage.getItem('email'),
			priceId: priceid,
		})
		.catch((e) => {})
}
async function changeQuantity(priceid, q) {
	await axios
		.post('http://127.0.0.1:7171/ChangeQuantity', {
			email: localStorage.getItem('email'),
			priceId: priceid,
			quantity: q,
		})
		.catch((e) => {})
}

const OrderCard = (props) => {
	const [quantity, setQuantity] = React.useState(props.baseQuantity)

	const [textVisibility, setTextVisibility] = React.useState(props.visibility)
	const handleClick = async (element) => {
		if (localStorage.getItem('tokenKey') != 'key') {
			setTextVisibility('visible')
			await addToTray(props.id)
			setQuantity(await Order(props.id))
		}
	}
	const handleMinus = async (element) => {
		await deleteFromTray(props.id)
		setQuantity(await Order(props.id))
		if (quantity == 0 || localStorage.getItem('email') == 'email') {
			setTextVisibility('hidden')
		}
		setTextVisibility('hidden')
	}

	const handleChangeQuantity = async (element) => {
		if (quantity == 0 || localStorage.getItem('email') == 'email') {
			setTextVisibility('hidden')
		}
		if (quantity < 0) quantity = 0
		setQuantity(element.target.value ? element.target.value : 0)
		await changeQuantity(props.id, element.target.value)
		setQuantity(await Order(props.id))
	}

	return (
		<div className='quantitybutton'>
			<input
				type='number'
				value={quantity}
				style={{ visibility: textVisibility }}
				onChange={(e) => {
					handleChangeQuantity(e)
				}}></input>
			<a className='orderLink' href='#'>
				<div
					className='PriceBtn'
					id={props.id}
					onClick={(e) => {
						handleClick(e)
					}}>
					{props.cost + ' ₽'}
				</div>
			</a>
			<a className='orderLink' href='#'>
				{' '}
				<div
					className='PriceBtn'
					style={{
						visibility: textVisibility,
						'background-color': 'red',
					}}
					id={props.id}
					onClick={(e) => handleMinus(e)}>
					-
				</div>
			</a>
		</div>
	)
}

export { OrderCard }
