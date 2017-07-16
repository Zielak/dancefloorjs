import { Graphics } from 'pixi.js'
import * as Color from 'd3-color'

import { world, rnd } from '../game'
import {rgb2hex} from '../utils'
import Entity from '../entity'
import Vector from '../vector'

import Thirst from './thirst'
import Hunger from './hunger'
import Intoxication from './intoxication'
import Mover from '../components/mover'

import AIController from '../components/aicontroller'

export default class Human extends Entity {

	constructor({ pos, realname, age, sex, orientation, status, persona }) {
		super()

		// this.entityId = manager.createEntity(['Thirst'])

		this.realname = realname || rnd.name()
		this.age = age || rnd.float(16.5, 45)
		this.sex = sex || rnd.bool() ? 'male' : 'female'
		this.orientation = orientation || rnd.pickone([
			'hetero', 'homo', 'bi'
		])
		this.status = status || rnd.pickone(['engaged', 'single'])
		this.persona = persona || Persona({})

		this.width = 12
		this.height = 30

		// TODO: get some better color management. HSL and random hues plz
		this.geometry = new Graphics()
		this.geometry
			.beginFill( rgb2hex(Color.hsl(
				rnd.float(0,365), rnd.float(0.8,1), rnd.float(0.4,0.6)
			).rgb()) )
			.drawRect(-this.width / 2, -this.height, this.width, this.height)
			.endFill()

		this.addComponent(new Mover({pos}))
		this.addComponent(new Thirst())
		this.addComponent(new Hunger())
		this.addComponent(new Intoxication())

		this.addComponent(new AIController({
			needs: ['thirst', 'hunger', 'intoxication']
		}))

		// add(new components.AIController({ name: 'controller' }));
		// add(new components.InputAI({ name: 'input' }));

		// add(new components.MoverWalking());

		// add(new components.Appearance());


		// Debugging
		// add(new components.HumanVisualSelector({ bounds: new Rectangle(0, 0, width, height) }));

		world.addChild(this.geometry)
	}

	set x(v) { this.geometry.x = v }
	set y(v) { this.geometry.y = v }
	get x() { return this.geometry.x }
	get y() { return this.geometry.y }

	set _x(v) { this.geometry._x = v }
	set _y(v) { this.geometry._y = v }
	get _x() { return this.geometry._x }
	get _y() { return this.geometry._y }

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
		['introExtroVert', introExtroVert || rnd.random()],
		['braveShy', braveShy || rnd.random()],
		['peacefulAggressive', peacefulAggressive || rnd.random()],
	])
}
