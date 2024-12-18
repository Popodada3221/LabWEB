import { useState } from "react"
import axios from "axios"
function ModalContentAuth(props) {
    const [token, setToken] = useState(localStorage.getItem("tokenKey"))
	
	
    const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
    
    const emailHandler = (e) =>
	{
		setEmail(e.target.value)
		console.log(e.target.value)
	}
	const passwordHandler = (e) =>
	{
		setPassword(e.target.value)
    }
    async function sendLoginData (email, password) 
	{
		console.log(email, password)
		await axios.post(
			'http://127.0.0.1:7171/Login',
			{
				email : email,
				password : password
			}
	).then(function a(response) {
		
		localStorage.setItem("tokenKey", response.data.access_token);
        localStorage.setItem("email", email);
        props.onsub(response.data.access_token);
		localStorage.setItem("email", response.data.username)
		console.log(localStorage.getItem("email"))
       
	}
	)
	
			
	
	}



    return ( <div className='ModalContentAuth'>
			<form className='authForm' /*onSubmit={sendLoginData(email, password)}*/>
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
				<p className='submit' type='submit'  value='Вход' onClick={()=>{sendLoginData(email, password); console.log(localStorage.getItem("tokenKey"))}}>Вход</p>
			</form>
		</div> );
}
 
export { ModalContentAuth};