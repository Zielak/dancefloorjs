import Game from './game'
import pathfinding from './pathfinding'

const FLOOR = 0
const WALL = 1
const DANCEFLOOR = 2
const DRINKBAR = 3
const FOODBAR = 4

const walkableTiles = [FLOOR,DANCEFLOOR,DRINKBAR,FOODBAR]

let tilemap = []

function prepareMap(stage){
	tilemap = createTileMap(
		parseInt(Game.gameWidth / pathfinding.GRID_CELL_SIZE),
		parseInt(Game.gameHeight / pathfinding.GRID_CELL_SIZE)
	)

	pathfinding.setGrid(tilemap)
	pathfinding.setAcceptableTiles(walkableTiles)
	stage.addChild(pathfinding.getDebugGrid())
}

function createTileMap(gridCols, gridRows) {
	const map = []
	for (let y = 0; y < gridRows; y++) {
		map[y] = []
		for (let x = 0; x < gridCols; x++) {
			map[y][x] = getTilemapCell(x, y, gridCols, gridRows)
		}
	}
	return map
}

/**
 * Used in generating building. Gives you one cell.
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} width 
 * @param {number} height 
 * @returns {number} cell type
 */
function getTilemapCell(x, y, width, height) {
	x = x / width
	y = y / height

	const col = 1/width
	const row = 1/height

	let fin = FLOOR
	
	if (
		x > 0.3 && x < 0.7 &&
		y > 0.3 && y < 0.7
	) {
		fin = DANCEFLOOR
	}

	// Drink bar
	if (
		Math.cos( y*Math.PI + x*Math.PI ) > 0.6
	) {
		fin = DRINKBAR
	}

	// Food bar
	if (
		Math.cos( (y+0.5)*Math.PI - (x+0.5)*Math.PI ) < -0.6
	) {
		fin = FOODBAR
	}

	// Random walls, only on empty space
	if (fin === FLOOR) {
		fin = Math.random() > 0.95 ? WALL : fin
	}

	// Bounds walls
	if (y<row || x<col || y>1-3*row || x>1-3*col){
		fin = WALL
	}
	return fin
}

export default {
	prepareMap,
}
