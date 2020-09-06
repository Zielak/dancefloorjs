import { GAME_WIDTH, GAME_HEIGHT } from "./game"
import Vector from "./vector"
import pathFinding from "./pathFinding"
import { mergeSort } from "./utils/sorting"

const FLOOR = 0
const WALL = 1
const DANCE_FLOOR = 2
const DRINK_BAR = 3
const FOOD_BAR = 4

const bounds = {
	x: 0,
	y: 0,
	w: GAME_WIDTH,
	h: GAME_HEIGHT,
}

const walkableTiles = [FLOOR, DANCE_FLOOR, DRINK_BAR, FOOD_BAR]

let tilemap = []

function prepareMap(stage) {
	tilemap = createTileMap(
		parseInt(GAME_WIDTH / pathFinding.GRID_CELL_SIZE) + 2,
		parseInt(GAME_HEIGHT / pathFinding.GRID_CELL_SIZE) + 2
	)

	pathFinding.setGrid(tilemap)
	pathFinding.setAcceptableTiles(walkableTiles)
	stage?.addChild(pathFinding.getDebugGrid())

	// update bounds
	bounds.x = pathFinding.GRID_CELL_SIZE * 0.1
	bounds.y = pathFinding.GRID_CELL_SIZE * 0.1
	bounds.w = (pathFinding.gridWidth - 2.1) * pathFinding.GRID_CELL_SIZE
	bounds.h = (pathFinding.gridHeight - 2.1) * pathFinding.GRID_CELL_SIZE
}

function createTileMap(gridCols, gridRows) {
	const map = []
	for (let y = 0; y < gridRows; y++) {
		map[y] = []
		for (let x = 0; x < gridCols; x++) {
			map[y][x] = getTileMapCell(x, y, gridCols, gridRows)
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

	const sorted = mergeSort(points, (a, b) => {
		return Vector.Subtract(start, a).length - Vector.Subtract(start, b).length
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
					tiles.push({ x, y })
				}
				return tiles
			}, []),
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
function getTileMapCell(x, y, width, height) {
	x = x / width
	y = y / height

	const col = 1 / width
	const row = 1 / height

	let fin = FLOOR

	if (x > 0.25 && x < 0.7 && y > 0.25 && y < 0.7) {
		fin = DANCE_FLOOR
	}

	let movedPI = Math.PI + Math.PI * 0.15

	// Drink bar
	if (Math.cos(y * movedPI + x * movedPI) > 0.6) {
		fin = DRINK_BAR
	}

	// Food bar
	if (Math.cos((y + 0.5) * movedPI - (x + 0.5) * movedPI) < -0.6) {
		fin = FOOD_BAR
	}

	// Random walls, only on empty space
	if (fin === FLOOR) {
		fin = Math.random() > 0.95 ? WALL : fin
	}

	// Bounds walls
	if (y > 1 - row * 3 || x > 1 - col * 3) {
		fin = WALL
	}
	return fin
}

export default {
	FLOOR,
	WALL,
	DANCE_FLOOR,
	DRINK_BAR,
	FOOD_BAR,
	bounds,

	prepareMap,

	_: {
		createTileMap,
		getClosestPoint,
		getTileMapCell,
		getAllPoints,
	},
}
