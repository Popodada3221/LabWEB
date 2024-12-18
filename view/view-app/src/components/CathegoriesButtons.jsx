

const CathegoriesButtons = (props) => {
	
	let k = 0




const buttons = []

let i = 0
props.cats.forEach(element => {
	
	buttons.push(
		<input
			type='button'
			value={element.value}
			className={'button-cathegories--' + element.state}
			onClick={(props.setcat(element.name))}
		/>
	)
	i++
});	
	

	return (
		<div className='cathegories'>
			{buttons}
		</div>
	)
}

export { CathegoriesButtons }
