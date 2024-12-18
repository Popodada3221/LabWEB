import { useState } from 'react'
import Modal from 'react-modal'
import '../styles/pages/Contacts.css'
import axios from 'axios'
import { ModalContentFeedback } from '../components/ModalContentFeedback'

const Contacts = () => {
	const [SendIsOpen, setSendIsOpen] = useState(false)
	const openSend = () => {
		setSendIsOpen(true)
	}

	const closeSend = () => {
		setSendIsOpen(false)
	}

	const SendContent = (
		<div className='SendContent'>
			<textarea cols={40} rows={8} placeholder='Напишите нам' />
			<input className='submit' value='Отправить' type='button'></input>
		</div>
	)
	return (
		<div className='ContactsContainer'>
			<div className='Page'>
				{' '}
				<h1>Контакты</h1>
				<div className='ContactsContentWrapper'>
					<p align='center'>
						Круглосуточная линия: <b>+7 (495) 287-87-87</b>
					</p>
					<p align='center'>
						Бесплатно по России: <b>+7 (495) 287-87-87</b>
					</p>
					<p align='center'>
						<p>Наши социальные сети:</p>
						<ul className='links' type='circle'>
							<li>
								<a className='submit' href='#'>
									VK
								</a>
							</li>
							<li>
								<a className='submit' href='#'>
									OK
								</a>
							</li>
							<li>
								<a className='submit' href='#'>
									YT
								</a>
							</li>
							<li>
								<a className='submit' href='#'>
									Дзен
								</a>
							</li>
							<li>
								<a className='submit' href='#'>
									Telegram
								</a>
							</li>
						</ul>
					</p>
					<div className='map'>
						<iframe
							className='map'
							src='https://yandex.ru/map-widget/v1/?um=constructor%3A6d1bef15cd746786e9df0d48587ab6194457ee0db374aca59c4e0955357a67cf&amp;source=constructor'
							frameborder='0'
							width='100%'
							height={600}></iframe>
					</div>
					<button className='send' onClick={openSend}>
						<div className='submit send'>Напишите нам</div>
					</button>
					<Modal
						className='ModalSend'
						overlayClassName='OverlaySend'
						isOpen={SendIsOpen}
						onRequestClose={closeSend}>
						<ModalContentFeedback></ModalContentFeedback>
					</Modal>
				</div>
			</div>
		</div>
	)
}
export { Contacts }
