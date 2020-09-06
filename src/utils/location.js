import Vector from "../vector"
import pathFinding from "../pathFinding"

export function worldPos2GridPos(x, y) {
	let vec = new Vector()
	if (x instanceof Object) {
		vec.set_xy(x.x, x.y)
	} else {
		vec.set_xy(x, y)
	}
	return vec
		.divideScalar(pathFinding.GRID_CELL_SIZE)
		.subtractScalar(0.5)
		.round()
}
export function gridPos2WorldPos(x, y) {
	let vec = new Vector()
	if (x instanceof Object) {
		vec.set_xy(x.x, x.y)
	} else {
		vec.set_xy(x, y)
	}
	return vec
		.multiplyScalar(pathFinding.GRID_CELL_SIZE)
		.addScalar(pathFinding.GRID_CELL_SIZE / 2)
}
