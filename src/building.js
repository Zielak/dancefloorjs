import { gameHeight, gameWidth } from './game'
import pathfinding from './pathfinding'

function prepareMap(world) {
	const tilemap = []
	const gridCols = parseInt(gameWidth / pathfinding.GRID_CELL_SIZE)
	const gridRows = parseInt(gameHeight / pathfinding.GRID_CELL_SIZE)
	for (let y = 0; y < gridRows; y++) {
		tilemap[y] = []
		for (let x = 0; x < gridCols; x++) {
			tilemap[y][x] = getTilemapCell(x, y, gridCols, gridRows)
		}
	}
	pathfinding.setGrid(tilemap)
	pathfinding.setAcceptableTiles([0,2,3,4])
	world.addChild(pathfinding.getDebugGrid())
}

// 0 - floor
// 1 - wall
// 2 - dancing
// 3 - drink bar
// 4 - food bar
function getTilemapCell(x, y, width, height) {
	x = x / width
	y = y / height
	let fin = 0
	// Dnacefloor
	if (
		x > 0.3 && x < 0.7 &&
		y > 0.3 && y < 0.7
	) {
		fin = 2
	}

	// Drink bar
	if (
		// Math.cos( x*Math.PI*2 ) > 0.2 &&
		Math.cos( y*Math.PI + x*Math.PI ) > 0.6
	) {
		fin = 3
	}

	// Food bar
	if (
		// Math.cos( y*Math.PI*2 ) > 0.2 &&
		Math.cos( (y+0.5)*Math.PI - (x+0.5)*Math.PI ) < -0.6
	) {
		fin = 4
	}

	// Random walls, only on empty space
	if (fin === 0) {
		fin = Math.random() > 0.85 ? 1 : fin
	}

	// Bounds walls
	if (y===0 || x===0 || y>=1-2/height || x>=1-2/width){
		fin = 1
	}
	return fin
}

export default {
	prepareMap,
	getTilemapCell,
}