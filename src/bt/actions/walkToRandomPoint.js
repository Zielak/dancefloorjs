import pathfinding from '../../pathfinding'
import {rnd} from '../../game'

class WalkToRandomPoint extends b3.Action {

	constructor (settings) {
		super(settings)
		
		this.entity = settings.entity || undefined
	}
	open (tick) {
		pathfinding.findPath(
			Math.round(this.entity.x/pathfinding.GRID_CELL_SIZE),
			Math.round(this.entity.y/pathfinding.GRID_CELL_SIZE),
			rnd.int(0, pathfinding.gridWidth-1),
			rnd.int(0, pathfinding.gridHeight-1),
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

WalkToRandomPoint.prototype.name = 'WalkToRandomPoint'
WalkToRandomPoint.prototype.parameters = {
	milliseconds: 3000,
	addRandom: 0,
	entity: undefined,
}

export default WalkToRandomPoint
