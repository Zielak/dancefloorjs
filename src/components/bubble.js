import {Graphics, Text} from 'pixi.js'
import {world} from '../game'

import Component from '../component'
// import Vector from '../vector'

export default class Bubble extends Component {
	/**
	 * Creates an instance of Bubble.
	 * @param {string} message 
	 * @param {PIXI.TextStyle} textStyle 
	 * @param {PIXI.Rectangle} rectangle
	 * @param {string} [background]
	 * @memberof Bubble
	 */
	constructor(message = '-silence-', textStyle = {fontSize: 12}, rectangle, background = 0xffffff) {
		super('bubble')
		
		this.createdTime = window.performance.now()
		this.endTime = this.createdTime + message.length * 100
		
		this.bgRect = new Graphics()
		this.bgRect.beginFill(background, 0.9)
			.drawRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)
			.endFill()

		this.text = new Text(message, textStyle)
	}
	
	addedToEntity() {
		world.addChild(this.bgRect)
		world.addChild(this.text)
	}
	
	removedFromEntity() {
		world.removeChild(this.bgRect)
		world.removeChild(this.text)
	}
	
	update(dt, entity) {
		this.updatePosition(entity)
		this.checkLifeTime(entity)
	}
	
	updatePosition(entity) {
		this.bgRect.x = entity.x
		this.bgRect.y = entity.y
		this.text.x = this.bgRect.x - this.bgRect.width/2
		this.text.y = this.bgRect.y
	}
	
	checkLifeTime(entity) {
		if (window.performance.now() > this.endTime) {
			entity.removeComponent(this)
		}
	}
}