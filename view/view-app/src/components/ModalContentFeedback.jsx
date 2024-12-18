import axios from 'axios'
import React from 'react'
async function SendFeedback(content) {
	await axios.post('http://127.0.0.1:7171/SendFeedback', {
		email: localStorage.getItem('email'),
		content: content,
	})
}

const ModalContentFeedback = () => {
	const [content, setContent] = React.useState('')
	const changeHandler = (e) => {
		setContent(e.target.value)
	}
	const clickHandler = async () => {
		await SendFeedback(content)
		setContent('')
	}
	return (
		<div className='SendContent'>
			<textarea
				cols={40}
				rows={8}
				placeholder='Напишите нам'
				value={content}
				onChange={(e) => changeHandler(e)}
			/>
			<input
				className='submit'
				value='Отправить'
				type='button'
				onClick={() => {
					clickHandler()
				}}></input>
		</div>
	)
}

export { ModalContentFeedback }
