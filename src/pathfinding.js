import EasyStar from "easystarjs"
import Vector from "./vector"
import { Container, Graphics } from "pixi.js"
import building from "./building"

const easystar = new EasyStar.js()

const pathFinding = {
	GRID_CELL_SIZE: 32,
	gridWidth: undefined,
	gridHeight: undefined,

	engine: easystar,
	setGrid: (twoDimensionalArray) => {
		pathFinding.gridWidth = twoDimensionalArray[0].length
		pathFinding.gridHeight = twoDimensionalArray.length
		redrawDebugGrid(twoDimensionalArray)
		easystar.setGrid(twoDimensionalArray)
	},
	getDebugGrid: () => debugGrid,
	setAcceptableTiles: (arrayOfAcceptableTiles) =>
		easystar.setAcceptableTiles(arrayOfAcceptableTiles),
	findPath: ({ startX, startY, start, targetX, targetY, target, callback }) => {
		startX = startX >= 0 ? startX : start.x
		startY = startY >= 0 ? startY : start.y
		targetX = targetX >= 0 ? targetX : target.x
		targetX = targetX >= 0 ? targetX : target.x

		return easystar.findPath(startX, startY, targetX, targetY, callback)
	},
	findPathToClosestType: ({ startX, startY, start, type, callback }) => {
		startX = startX >= 0 ? startX : start.x
		startY = startY >= 0 ? startY : start.y
		const target = building._.getClosestPoint(startX, startY, type)

		return easystar.findPath(startX, startY, target.x, target.y, callback)
	},
	enableDiagonals: () => easystar.enableDiagonals(),
	enableCornerCutting: () => easystar.enableCornerCutting(),
	calculate: () => easystar.calculate(),
}

export default pathFinding

const debugGrid = new Container()
const gridGraphics = new Graphics()
debugGrid.addChild(gridGraphics)

function redrawDebugGrid(grid) {
	const width = grid[0].length - 1
	const height = grid.length - 1
	const OUTLINE = 0x333333
	let value
	gridGraphics.clear()
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			value = grid[y][x]

			if (value > 0) {
				gridGraphics.beginFill(getCellColor(value))
			}
			gridGraphics.fillAlpha = 0.5
			gridGraphics
				.lineStyle(1, OUTLINE)
				.drawRect(
					x * pathFinding.GRID_CELL_SIZE,
					y * pathFinding.GRID_CELL_SIZE,
					pathFinding.GRID_CELL_SIZE,
					pathFinding.GRID_CELL_SIZE
				)
			if (value > 0) {
				gridGraphics.endFill()
			}
		}
	}
}

function getCellColor(value) {
	switch (value) {
		case building.FLOOR:
			return 0x333333
		case building.WALL:
			return 0x333333
		case building.DANCE_FLOOR:
			return 0x441133
		case building.DRINK_BAR:
			return 0x113355
		case building.FOOD_BAR:
			return 0x114422
		default:
			return 0x000000
	}
}
