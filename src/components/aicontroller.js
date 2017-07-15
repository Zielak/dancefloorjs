import Component from '../component'
import { world, rnd } from '../game'

import {Wait, Logger, WalkRandomAngle} from '../bt/actions'
import RandomChild from '../bt/composites/random-child'
import Condition from '../bt/decorators/condition'

export default class AIController extends Component {
	constructor() {
		super('aicontroller')
	}

	addedToEntity() {

		this.tree = new b3.BehaviorTree()

		const humanNeeds = [
			// HUNGER
			new Condition({
				checkCondition: () => {
					const hunger = this.entity.getComponent('hunger')
					// console.log(`hunger = ${hunger.value}`)
					return hunger.value >= rnd.float(0.7, 0.85)
				},
				child: new Logger({
					message: 'HUNGRY, lets eat',
					entity: this.entity,
					textStyle: {fill: 0xffffff, fontWeight: 'bold'},
					background: 0x005500,
				})
			}),
			// THIRST
			new Condition({
				checkCondition: () => {
					const thirst = this.entity.getComponent('thirst')
					// console.log(`thirst = ${thirst.value}`)
					return thirst.value >= rnd.float(0.7, 0.85)
				},
				child: new Logger({
					message: 'THIRSTY',
					entity: this.entity,
					textStyle: {fill: 0xffffff, fontWeight: 'bold'},
					background: 0x0055FF,
				}),
			}),
			// INTOXICATION
			new Condition({
				checkCondition: () => {
					const intoxication = this.entity.getComponent('intoxication')
					// console.log(`intoxication = ${intoxication.value}`)
					// TODO: check persona, if a guy WANTS to drink/get high
					return intoxication.value <= rnd.float(0, 0.3)
				},
				child: new Logger({
					message: 'NEED A DRINK',
					entity: this.entity,
					textStyle: {fill: 0xffff00, fontWeight: 'bold'},
					background: 0x880000,
				}),
			}),
		]

		this.tree.root = new b3.Sequence({
			children: [
				new Wait({
					milliseconds: 3000,
					addRandom: 1000
				}),
				new WalkRandomAngle({
					entity: this.entity,
					milliseconds: rnd.float(1000, 4000)
				}),
				// new RandomChild({
				// 	children: humanNeeds
				// }),
			]
		})

		this.blackboard = new b3.Blackboard()

		this.hungryTree = new b3.BehaviorTree()
	}

	update(dt, entity) {
		this.tree.tick(entity, this.blackboard)
	}
}