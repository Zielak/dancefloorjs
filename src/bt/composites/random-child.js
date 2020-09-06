import Game from "../../game"

class RandomChild extends b3.Composite {
	constructor({ children }) {
		super({ children, name: "RandomChild" })
	}
	open(tick) {
		tick.blackboard.set(
			"runningChild",
			Game.rnd.pickone(this.children),
			tick.tree.id,
			this.id
		)
	}
	tick(tick) {
		const child = tick.blackboard.get("runningChild", tick.tree.id, this.id)
		const status = child._execute(tick)

		if (status !== b3.SUCCESS) {
			return status
		}

		return b3.SUCCESS
	}
}

export default RandomChild
