import '../styles/components/Popular.css'
import { PopularCard } from './PopularCard'
const Popular = () => {
	return (
		<div className='Popular'>
			<h1>Популярные направления</h1>
			<div className='PopularContainer'>
				<PopularCard
					classname='card'
					im='https://s01.cdn.pegast.ru/get/12/2b/7e/d7219b001f77043679f41508ac2fd471fc5b2b0c091fe67909c89941f7/1.png'
					text='Турция'
				/>
				<PopularCard
					classname='card'
					im='https://s01.cdn.pegast.ru/get/74/92/e4/a07ae1264d7a81648651e40dcc7c182026df8b1999e85351083c1cc101/2.png'
					text='Таиланд'
				/>
			</div>
		</div>
	)
}

export { Popular }
