import {rnd} from '../../game'

const RandomChild = b3.Class(b3.Composite)
const _ = RandomChild.prototype

_.name = 'RandomChild'

_.tick = function (tick) {
	console.log('tick RandomChild')
	rnd.pickone(this.children)._execute(tick)
	return b3.SUCCESS
}

export default RandomChild
