import Modal from 'react-modal'

import { Link } from 'react-router-dom'
import '../styles/components/NavBar.css'
import { useState } from 'react'
import { ModalContentAuth } from './ModalContentAuth'

import { ModalContentRegister } from './ModalContentRegister'
import axios from 'axios'

var tokenKey = 'tokenKey'

async function sendLoginData(email, password) {
	console.log(email, password)
	await axios
		.post('http://127.0.0.1:7171/Login', {
			email: email,
			password: password,
		})
		.then(function a(response) {
			localStorage.setItem('tokenKey', response.data.access_token)
		})
}
let sum = 0
async function getOrdersCount(params) {
	await axios
		.post('http://127.0.0.1:7171/SumOrder', {
			email: localStorage.getItem('email'),
		})
		.then((result) => {
			sum = result.data
		})
}

await getOrdersCount()

const NavBar = () => {
	Modal.setAppElement('body')
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count + 1) // Update the state and trigger a re-render
	}

	const decrement = () => {
		setCount(count - 1) // Update the state and trigger a re-render
	}

	const [modalIsOpen, setModalIsOpen] = useState(false)
	const [modal1IsOpen, setModal1IsOpen] = useState(false)

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}
	const openModal1 = () => {
		setModal1IsOpen(true)
	}

	const closeModal1 = () => {
		setModal1IsOpen(false)
	}

	const [name, setName] = useState('')
	const [OT, setOT] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [retype, setRetype] = useState('')
	const [send, setSend] = useState(false)
	const [emailRegister, setEmailRegister] = useState('')
	const [passwordRegister, setPasswordRegister] = useState('')
	const [token, setToken] = useState(localStorage.getItem('tokenKey'))

	const nameHandler = (e) => {
		setName(e.target.value)
	}
	const OTHandler = (e) => {
		setOT(e.target.value)
	}
	const lastNameHandler = (e) => {
		setLastName(e.target.value)
	}
	const emailHandler = (e) => {
		setEmail(e.target.value)
		console.log(e.target.value)
	}
	const passwordHandler = (e) => {
		setPassword(e.target.value)
	}
	const retypeHandler = (e) => {
		setRetype(e.target.value)
	}
	const emailRegisterHandler = (e) => {
		setEmailRegister(e.target.value)
	}
	const passwordRegisterHandler = (e) => {
		setPasswordRegister(e.target.value)
	}

	const Auth = (key) => {
		axios({
			method: 'get',
			url: 'http://127.0.0.1:7171/Auth',
			headers: {
				Authorization: 'Bearer ' + key,
			},
		})
			.then(setToken(localStorage.getItem('tokenKey')))
			.catch(function (error) {
				if (error.response.status == 401) {
					setToken('key')
					localStorage.setItem('tokenKey', 'key')
				}
			})
	}

	/*
	const modalContentAuth = (
		<div className='ModalContentAuth'>
			<form className='authForm' /*onSubmit={sendLoginData(email, password)}>
				<input
					id='emailInput'
					type='email'
					placeholder='ivanov@ivan.ivanovich'
					value={email}
					onChange ={(element) => emailHandler(element)}
					></input>
				<input
					id='passwordInput'
					type='password'
					placeholder='password'
					value={password}
					onChange ={(element) => passwordHandler(element)}
					></input>
				<p className='submit' type='submit'  value='Вход' onClick={()=>{closeModal1();sendLoginData(email, password); Auth(); setEmail(""); setPassword("");}}>Вход</p>
			</form>
		</div>
	)
	const modalContentRegister = (
		<div className='ModalContentRegister'>
			<form className='authForm'>
				<input
					id='NameInput'
					type='text'
					placeholder='Имя'></input>
				<input
					id='OTInput'
					type='text'
					placeholder='Отчество'></input>
				<input
					id='LastNameInput'
					type='text'
					placeholder='Фамилия'></input>
				<input
					id='emailInput'
					type='email'
					placeholder='ivanov@ivan.ivanovich'></input>
				<input
					id='passwordInput'
					type='password'
					placeholder='password'></input>
				<input
					id='passwordRetype'
					type='password'
					placeholder='retype password'></input>
				<input
					className='submit'
					type='submit'
					value='Регистрация'></input>
			</form>
		</div>
	)
	*/

	function AuthButtons() {
		//Auth(localStorage.getItem("tokenKey"));
		console.log(localStorage.getItem('tokenKey'))
		if (token == 'key')
			return (
				<div className='Auth'>
					<a className='Register'>
						<p
							className='base-button Register__text'
							onClick={() => {
								if (modalIsOpen) {
									closeModal()
								} else openModal()
							}}>
							Регистрация
						</p>
						<Modal
							className='Modal'
							overlayClassName='Overlay'
							isOpen={modalIsOpen}
							onRequestClose={closeModal}
							ariaHideApp={false}
							shouldFocusAfterRender={false}>
							<ModalContentRegister></ModalContentRegister>
						</Modal>
					</a>
					<a className='Login'>
						<p
							className='base-button Login__text'
							onClick={() => {
								if (modal1IsOpen) {
									closeModal1()
								} else openModal1()
							}}>
							Вход
						</p>
						<Modal
							className='Modal'
							overlayClassName='Overlay'
							isOpen={modal1IsOpen}
							onChange={() => openModal}
							onRequestClose={closeModal1}
							shouldFocusAfterRender={false}
							autoFocus={false}>
							<ModalContentAuth onsub={Auth}></ModalContentAuth>
						</Modal>
					</a>
				</div>
			)
		else
			return (
				<div className='Auth'>
					<a className='Register'>
						<Link to='/Card' className='base-button Register__text'>
							Корзина
							<div className='CardCounter'>{sum}</div>
						</Link>
					</a>
					<a className='Login'>
						<Link
							to='/'
							className='base-button Login__text'
							onClick={() => {
								localStorage.setItem('tokenKey', 'key')
								Auth(localStorage.getItem('key'))
								localStorage.setItem('email', 'email')
							}}>
							Выйти
						</Link>
					</a>
				</div>
			)
	}

	return (
		<div className='NavBar'>
			<div className='Logo'>
				<Link to='/'>
					<img
						src={process.env.PUBLIC_URL + '/images/logo-pegas.svg'}
					/>
				</Link>
			</div>
			<div className='Panel'>
				<Link
					className={
						window.location.pathname == '/'
							? 'Panel__Item active'
							: 'Panel__Item'
					}
					onClick={increment}
					to='/'>
					Главная
				</Link>
				<Link
					className={
						window.location.pathname == '/Catalogue'
							? 'Panel__Item active'
							: 'Panel__Item'
					}
					onClick={increment}
					to='/Catalogue'>
					Каталог
				</Link>
				<Link
					className={
						window.location.pathname == '/About'
							? 'Panel__Item active'
							: 'Panel__Item'
					}
					onClick={increment}
					to='/About'>
					О нас
				</Link>
				<Link
					className={
						window.location.pathname == '/Contacts'
							? 'Panel__Item active'
							: 'Panel__Item'
					}
					onClick={increment}
					to='/Contacts'>
					Контакты
				</Link>
			</div>

			<AuthButtons></AuthButtons>
		</div>
	)
}
export { NavBar }
