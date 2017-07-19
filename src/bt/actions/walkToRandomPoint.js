import pathfinding from '../../pathfinding'
import * as utils from '../../utils'
import Game from '../../game'

class WalkToRandomPoint extends b3.Action {

	constructor (settings) {
		super({name: 'WalkToRandomPoint'})
		
		this.entity = settings.entity || undefined
	}
	open (tick) {
		const from = utils.worldPos2GridPos(this.entity.x, this.entity.y)
		const target = {
			x: Game.rnd.int(0, pathfinding.gridWidth-1),
			y: Game.rnd.int(0, pathfinding.gridHeight-1)
		}
		pathfinding.findPath(
			from.x, from.y, target.x, target.y,
			foundPath => tick.blackboard.set('path', foundPath, tick.tree.id, this.id)
		)
		const mover = this.entity.getComponent('mover')
		mover.clearPath()
		tick.blackboard.set('path', undefined, tick.tree.id, this.id)
		tick.blackboard.set('mover', mover, tick.tree.id, this.id)
	}
	close (tick) {
		// console.log('closing walkRandom')
		const mover = tick.blackboard.get('mover', tick.tree.id, this.id)
		mover.velocity.set_xy(0,0)
	}
	tick (tick) {
		const mover = tick.blackboard.get('mover', tick.tree.id, this.id)
		const foundPath = tick.blackboard.get('path', tick.tree.id, this.id)
		if (foundPath && !mover.movingAlongPath && !mover.reachedPathDestination) {
			mover.moveAlongPath(foundPath)
		}
		if(mover.reachedPathDestination){
			mover.clearPath()
			return b3.SUCCESS
		}
		return b3.RUNNING
	}
}

export default WalkToRandomPoint
