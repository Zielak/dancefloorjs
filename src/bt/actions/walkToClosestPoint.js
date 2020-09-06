import pathfinding from "../../pathfinding"
import * as utils from "../../utils"
import Game from "../../game"

class WalkToClosestPoint extends b3.Action {
	constructor({ name = "WalkToClosestPoint", entity, targetType }) {
		super({ name })

		this.targetType = targetType
		this.entity = entity
	}
	open(tick) {
		const finder = pathfinding.findPathToClosestType({
			start: utils.worldPos2GridPos(this.entity.x, this.entity.y),
			type: this.targetType,
			callback: (foundPath) =>
				tick.blackboard.set("path", foundPath, tick.tree.id, this.id),
		})
		const mover = this.entity.getComponent("mover")
		mover.clearPath()

		tick.blackboard.set("finder", finder, tick.tree.id, this.id)
		tick.blackboard.set("path", undefined, tick.tree.id, this.id)
		tick.blackboard.set("mover", mover, tick.tree.id, this.id)
	}
	close(tick) {
		// console.log('closing walkRandom')
		const mover = tick.blackboard.get("mover", tick.tree.id, this.id)
		mover.velocity.set_xy(0, 0)
	}
	tick(tick) {
		const finder = tick.blackboard.get("finder", tick.tree.id, this.id)
		const mover = tick.blackboard.get("mover", tick.tree.id, this.id)
		const foundPath = tick.blackboard.get("path", tick.tree.id, this.id)

		if (foundPath === null) {
			// Failed to find a path
			return b3.FAILURE
		}

		// Still running to the point
		if (foundPath && !mover.movingAlongPath && !mover.reachedPathDestination) {
			mover.moveAlongPath(foundPath)
		}

		// I reached the point!
		if (mover.reachedPathDestination) {
			mover.clearPath()
			return b3.SUCCESS
		}

		return b3.RUNNING
	}
}

export default WalkToClosestPoint
