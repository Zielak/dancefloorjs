import {Container, Graphics} from 'pixi.js'
import * as utils from './utils'

let chosen = undefined
const debugStage = new Container()
const graphics = new Graphics()

function init(stage) {
	stage.addChild(debugStage)
	debugStage.addChild(graphics)

	stage.on('updateHumanDebugger', data => {
		// console.log('updateHumanDebugger', data)
		if(chosen !== data.getComponent('mover')){
			chosen = data.getComponent('mover')
		}else{
			chosen = undefined
		}
	})
}

function update(){
	graphics.clear()

	if(chosen && chosen.movingAlongPath){
		let first = utils.gridPos2WorldPos(chosen.path[0])
		graphics
			.lineStyle(4, 0xaa1111, 0.5)
			.moveTo(first.x, first.y)
		chosen.path.forEach(point => {
			const _p = utils.gridPos2WorldPos(point)
			graphics.lineTo(_p.x, _p.y)
		})
		// graphics.endFill()
	}
}

export default {
	init,
	update
}