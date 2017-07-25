import Game from './game'
import Vector from './vector'
import pathfinding from './pathfinding'
import * as utils from './utils'

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
	stage && stage.addChild(pathfinding.getDebugGrid())
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
 * Gives you position of the closest cell of given type
 * 
 * @param {number} x 
 * @param {number} y 
 * @param {number} type FLOOR, WALL etc
 * @returns {Vector}
 */
function getClosestPoint(x, y, type = FLOOR) {
	const points = getAllPoints(type)
	const start = new Vector(x, y)

	const sorted = utils.mergeSort(points, (a, b) => {
		return ((Vector.Subtract(start, a).length) - (Vector.Subtract(start, b).length))
	})

	return sorted[0]
}

/**
 * Get all points of given type from the tilemap
 * 
 * @param {number} type 
 * @returns 
 */
function getAllPoints(type = 0) {
	return tilemap.reduce((foundTiles, row, y) => {
		return [
			...foundTiles,
			...row.reduce((tiles, el, x) => {
				if (el === type) {
					tiles.push({x, y})
				}
				return tiles
			}, [])
		]
	}, [])
}

/**
 * Used in generating building. Gives you one cell.
 * TODO: seperate procedural generation
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
	FLOOR,
	WALL,
	DANCEFLOOR,
	DRINKBAR,
	FOODBAR,

	prepareMap,
	
	_: {
		createTileMap,
		getClosestPoint,
		getTilemapCell,
		getAllPoints,
	}
}
