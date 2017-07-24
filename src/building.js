import {gameWidth, gameHeight} from './game'
import Vector from './vector'
import pathfinding from './pathfinding'

export const FLOOR = 0
export const WALL = 1
export const DANCEFLOOR = 2
export const DRINKBAR = 3
export const FOODBAR = 4

const walkableTiles = [FLOOR,DANCEFLOOR,DRINKBAR,FOODBAR]

let tilemap = []

function prepareMap(stage){
	tilemap = createTileMap(
		parseInt(gameWidth / pathfinding.GRID_CELL_SIZE),
		parseInt(gameHeight / pathfinding.GRID_CELL_SIZE)
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
	const point = new Vector(x, y)
	const points = getAllPoints(type)
	
	return points
}

/**
 * Get all points of given type from the tilemap
 * 
 * @param {number} type 
 * @returns 
 */
function getAllPoints(type) {
	let points = tilemap.reduce((prev, arr, x) => {
		return arr.reduce((prev, el, y) => {
			if (el === type) {
				prev.push({x, y})
				return prev
			}
		}, [])
	}, [])
	return points
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
	prepareMap,
	
	_: {
		createTileMap,
		getClosestPoint,
		getTilemapCell,
	}
}
