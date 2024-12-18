import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ModalContentRegister(props) {
	const [name, setName] = useState('')
	const [OT, setOT] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [retype, setRetype] = useState('')
	const [nameValidator, setNameValidator] = useState('')
	const [OTValidator, setOTValidator] = useState('')
	const [lastNameValidator, setLastNameValidator] = useState('')
	const [emailValidator, setEmailValidator] = useState('')
	const [passwordValidator, setPasswordValidator] = useState('')
	const [retypeValidator, setRetypeValidator] = useState('')

	const [allValidator, setAllValidator] = useState('')

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

	async function sendRegData(name, OT, lastName, email, password) {
		if (
			name.length <= 3 ||
			lastName.length <= 3 ||
			!/.+@.+\.[A-Za-z]+$/.test(email) ||
			password.length <= 8 ||
			password != retype
		) {
			setAllValidator('Некорректные данные')
		}
		console.log(email, password)
		await axios
			.post('http://127.0.0.1:7171/CreateUser', {
				Name: name,
				SurName: OT,
				LastName: lastName,
				Email: email,
				Password: password,
			})
			.then(function a(response) {})
	}
	React.useEffect(() => {
		if (retype == password) {
			setRetypeValidator('')
		} else {
			setRetypeValidator('Пароли не совпадают')
		}
		if (/.+@.+\.[A-Za-z]+$/.test(email)) {
			setEmailValidator('')
		} else {
			setEmailValidator('Введите корректную почту')
		}
	}, [
		password,
		retype,
		retypeValidator,
		passwordValidator,
		email,
		emailValidator,
		name,
		nameValidator,
		lastName,
		lastNameValidator,
		OT,
		OTValidator,
	])

	return (
		<div className='ModalContentRegister'>
			<form
				className='authForm' /*onSubmit={sendLoginData(email, password)}*/
			>
				<input
					id='NameInput'
					type='text'
					placeholder='Имя'
					value={name}
					onChange={(element) => nameHandler(element)}></input>
				<input
					id='OTInput'
					type='text'
					placeholder='Отчество'
					value={OT}
					onChange={(e) => OTHandler(e)}></input>
				<input
					id='LastNameInput'
					type='text'
					placeholder='Фамилия'
					value={lastName}
					onChange={(e) => lastNameHandler(e)}></input>
				<input
					id='emailInput'
					type='email'
					placeholder='Почта'
					value={email}
					onChange={(e) => emailHandler(e)}></input>
				<p className='validator'>{emailValidator}</p>
				<input
					id='passwordInput'
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={(element) => passwordHandler(element)}></input>
				<input
					id='passwordRetype'
					type='password'
					placeholder='Повторите пароль'
					value={retype}
					onChange={(element) => retypeHandler(element)}></input>
				<p className='validator'>{retypeValidator}</p>
				<div>
					<input type='radio' />
					<label>
						{' '}
						Я соглашаюсь с{' '}
						<a href='/About' target='_blank'>
							политикой конфиденциальности
						</a>
					</label>
				</div>
				<input
					className='submit'
					type='submit'
					value='Регистрация'
					onClick={() => {
						sendRegData(name, OT, lastName, email, password)
						console.log(localStorage.getItem('tokenKey'))
					}}
				/>
				<div className='AllValidator'>{allValidator}</div>
			</form>
		</div>
	)
}

export { ModalContentRegister }
