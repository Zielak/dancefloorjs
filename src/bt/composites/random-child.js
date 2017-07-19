import Game from '../../game'

class RandomChild extends b3.Composite {
	tick(tick) {
		// console.log('tick RandomChild')
		Game.rnd.pickone(this.children)._execute(tick)
		return b3.SUCCESS
	}
}

RandomChild.prototype.name = 'RandomChild'

export default RandomChild
