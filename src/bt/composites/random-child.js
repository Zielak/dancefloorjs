import * as b3 from 'behavior3js'
import {rnd} from '../../game'

const RandomChild = b3.Class(b3.Composite)
const _ = RandomChild.prototype

_.name = 'RandomChild'

_.tick = function (tick) {
	rnd.pickone(this.children)._execute(tick)
	return b3.SUCCESS
}

export default RandomChild
