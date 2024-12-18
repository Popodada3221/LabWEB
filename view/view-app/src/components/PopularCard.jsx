const PopularCard = (props) => {
	return (
		<div>
			<img className='PopularImg' src={props.im}></img>
			{console.log(props.im)}
			<p>{props.text}</p>
		</div>
	)
}

export { PopularCard }
