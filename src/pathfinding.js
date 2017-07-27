import EasyStar from 'easystarjs'
import Vector from './vector'
import { Container, Graphics } from 'pixi.js'
import buliding from './building'

const easystar = new EasyStar.js()

const pathfinding = {
	GRID_CELL_SIZE: 32,
	gridWidth: undefined,
	gridHeight: undefined,

	engine: easystar,
	setGrid: twoDimensionalArray => {
		pathfinding.gridWidth = twoDimensionalArray[0].length
		pathfinding.gridHeight = twoDimensionalArray.length
		redrawDebugGrid(twoDimensionalArray)
		easystar.setGrid(twoDimensionalArray)
	},
	getDebugGrid: () => debugGrid,
	setAcceptableTiles: arrayOfAcceptableTiles => 
		easystar.setAcceptableTiles(arrayOfAcceptableTiles)
	,
	findPath: ({startX, startY, start, targetX, targetY, target, callback}) => {
		startX = startX >= 0 ? startX : start.x
		startY = startY >= 0 ? startY : start.y
		targetX = targetX >= 0 ? targetX : target.x
		targetX = targetX >= 0 ? targetX : target.x
		
		return easystar.findPath(startX, startY, targetX, targetY, callback)
	},
	findPathToClosestType: ({startX, startY, start, type, callback}) => {
		startX = startX >= 0 ? startX : start.x
		startY = startY >= 0 ? startY : start.y
		const target = buliding._.getClosestPoint(startX, startY, type)
		
		return easystar.findPath(startX, startY, target.x, target.y, callback)
	},
	enableDiagonals: () => easystar.enableDiagonals(),
	enableCornerCutting: () => easystar.enableCornerCutting(),
	calculate: () => easystar.calculate()
}

export default pathfinding

const debugGrid = new Container()
const gridGraphics = new Graphics()
debugGrid.addChild(gridGraphics)

function redrawDebugGrid(grid){
	const width = grid[0].length - 1
	const height = grid.length - 1
	const OUTLINE = 0x333333
	let value
	gridGraphics.clear()
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			
			value = grid[y][x]

			if(value > 0){
				gridGraphics.beginFill(getCellColor(value))
			}
			gridGraphics.fillAlpha = 0.5
			gridGraphics
				.lineStyle(1, OUTLINE)
				.drawRect(
					x*pathfinding.GRID_CELL_SIZE, y*pathfinding.GRID_CELL_SIZE,
					pathfinding.GRID_CELL_SIZE, pathfinding.GRID_CELL_SIZE
				)
			if(value > 0){
				gridGraphics.endFill()
			}
			
		}
	}
}

function getCellColor(value){
	switch (value) {
		case buliding.FLOOR: return 0x333333
		case buliding.WALL: return 0x333333
		case buliding.DANCEFLOOR: return 0x441133
		case buliding.DRINKBAR: return 0x113355
		case buliding.FOODBAR: return 0x114422
		default: return 0x000000
	}
}

