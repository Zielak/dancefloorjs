import EasyStar from 'easystarjs'
import Vector from './vector'
import {Container, Graphics} from 'pixi.js'

const easystar = new EasyStar.js()

const pathfinding = {
	GRID_CELL_SIZE: 20,
	gridWidth: undefined,
	gridHeight: undefined,

	worldPos2GridPos: (x, y) => {
		let vec = new Vector()
		if(x instanceof Vector){
			vec.set_xy(x.x, x.y)
		}else{
			vec.set_xy(x, y)
		}
		return vec.divideScalar(pathfinding.GRID_CELL_SIZE).round()
	},
	gridPos2WorldPos: (x, y) => {
		let vec = new Vector()
		if(x instanceof Vector){
			vec.set_xy(x.x, x.y)
		}else{
			vec.set_xy(x, y)
		}
		return vec.multiplyScalar(pathfinding.GRID_CELL_SIZE)
	},

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
	findPath: (a, b, c, d, e) => {
		let startX, startY, endX, endY, callback
		if(a instanceof Vector && b instanceof Vector){
			startX = a.x
			startY = a.y
			endX = b.x
			endY = b.y
			callback = c
		}else{
			startX = a
			startY = b
			endX = c
			endY = d
			callback = e
		}
		return easystar.findPath(startX, startY, endX, endY, callback)
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
	let value
	gridGraphics.clear()
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			value = grid[y][x]
			if(value >= 2 || value === 0){
				gridGraphics
					.lineStyle(1, getCellColor(value))
					.drawRect(
						x*pathfinding.GRID_CELL_SIZE, y*pathfinding.GRID_CELL_SIZE,
						pathfinding.GRID_CELL_SIZE, pathfinding.GRID_CELL_SIZE
					)
			}else{
				gridGraphics
					.beginFill(0x333333)
					.lineStyle(0)
					.drawRect(
						x*pathfinding.GRID_CELL_SIZE, y*pathfinding.GRID_CELL_SIZE,
						pathfinding.GRID_CELL_SIZE, pathfinding.GRID_CELL_SIZE
					)
					.endFill()
			}
		}
	}
}

function getCellColor(value){
	switch(value){
		case 1: return 0x000000
		case 2: return 0x441133
		case 3: return 0x113355
		case 4: return 0x114422
	}
	return 0x333333 // case 0:
}
