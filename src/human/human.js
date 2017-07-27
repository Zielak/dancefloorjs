import { Graphics } from 'pixi.js'
import * as Color from 'd3-color'

import Game from '../game'
import {rgb2hex} from '../utils'
import Entity from '../entity'
import Vector from '../vector'
import building from '../building'

import Thirst from './thirst'
import Hunger from './hunger'
import Intoxication from './intoxication'
import Mover from '../components/mover'

import AIController from '../components/aicontroller'

export default class Human extends Entity {

	constructor({ pos, realname, age, sex, orientation, status, persona }) {
		super()

		// this.entityId = manager.createEntity(['Thirst'])

		this.realname = realname || Game.rnd.name()
		this.age = age || Game.rnd.float(16.5, 45)
		this.sex = sex === undefined ? (Game.rnd.bool() ? 'male' : 'female') : sex
		this.orientation = orientation || Game.rnd.pickone([
			'hetero', 'homo', 'bi'
		])
		this.status = status || Game.rnd.pickone(['engaged', 'single'])
		this.persona = persona || Persona({})

		this.width = 12
		this.height = 30

		this.geometry = Human.prepareGeometry(this)
		Game.stage.addChild(this.geometry)

		this.addComponent(new Mover({
			pos,
			bounds: building.bounds
		}))
		this.addComponent(new Thirst())
		this.addComponent(new Hunger())
		this.addComponent(new Intoxication())

		this.addComponent(new AIController({
			needs: ['thirst', 'hunger', 'intoxication']
		}))

		// add(new components.AIController({ name: 'controller' }));
		// add(new components.InputAI({ name: 'input' }));

		// add(new components.Appearance());


		// Debugging
		// add(new components.HumanVisualSelector({ bounds: new Rectangle(0, 0, width, height) }));

	}

	set x(v) { this.geometry.x = v }
	set y(v) { this.geometry.y = v }
	get x() { return this.geometry.x }
	get y() { return this.geometry.y }

	set _x(v) { this.geometry._x = v }
	set _y(v) { this.geometry._y = v }
	get _x() { return this.geometry._x }
	get _y() { return this.geometry._y }

	static prepareGeometry(human){
		const geom = new Graphics()
		geom
			.beginFill( rgb2hex(Color.hsl(
				Game.rnd.float(0,365), Game.rnd.float(0.8,1), Game.rnd.float(0.4,0.6)
			).rgb()) )
			.drawRect(-human.width / 2, -human.height, human.width, human.height)
			.endFill()

		geom.interactive = true
		geom.on('click', () => {
			Game.stage.emit('updateHumanDebugger', human)
		})
		return geom
	}

}

/**
 * Static characteristics of a person
 * Intro/Extrovert, Brave/Shy, Peaceful/Aggressive etc.
 * Values usually in range of <0...1>
 * 
 * @export
 * @param {any} {introExtroVert, braveShy, peacefulAggressive} 
 * @returns {Map}
 */
function Persona({ introExtroVert, braveShy, peacefulAggressive }) {
	return new Map([
		['introExtroVert', introExtroVert || Game.rnd.random()],
		['braveShy', braveShy || Game.rnd.random()],
		['peacefulAggressive', peacefulAggressive || Game.rnd.random()],
	])
}
