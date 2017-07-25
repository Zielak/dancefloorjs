import Component from '../component'
import Game from '../game'
import buliding from '../building'

import {
	Wait, Logger, WalkRandomAngle, WalkToClosestPoint, WalkToRandomPoint, WalkTo
} from '../bt/actions'
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
				name: 'Hunger',
				checkCondition: () => {
					const hunger = this.entity.getComponent('hunger')
					return hunger.value >= 0.2 // Game.rnd.float(0.7, 0.85)
				},
				child: new b3.MemSequence({
					children: [
						new Logger({
							message: 'HUNGRY, lets eat',
							entity: this.entity,
							textStyle: {fill: 0xffffff, fontWeight: 'bold'},
							background: 0x005500,
						}),
						new WalkToClosestPoint({
							name: 'WalkToClosestFoodbar',
							entity: this.entity,
							targetType: buliding.FOODBAR,
						})
					]
				})

			}),
			// THIRST
			new Condition({
				name: 'Thirst',
				checkCondition: () => {
					const thirst = this.entity.getComponent('thirst')
					return thirst.value >= 0.2 // Game.rnd.float(0.7, 0.85)
				},
				child: new b3.MemSequence({
					children: [
						new Logger({
							message: 'THIRSTY',
							entity: this.entity,
							textStyle: {fill: 0xffffff, fontWeight: 'bold'},
							background: 0x0055FF,
						}),
						new WalkToClosestPoint({
							name: 'WalkToClosestDrinkbar',
							entity: this.entity,
							targetType: buliding.DRINKBAR,
						})
					]
				})

			}),
			// INTOXICATION
			new Condition({
				name: 'Intoxication',
				checkCondition: () => {
					const intoxication = this.entity.getComponent('intoxication')
					// TODO: check persona, if a guy WANTS to drink/get high
					return intoxication.value <= Game.rnd.float(0, 0.3)
				},
				child: new b3.MemSequence({
					children: [
						new Logger({
							message: 'NEED A DRINK',
							entity: this.entity,
							textStyle: {fill: 0xffff00, fontWeight: 'bold'},
							background: 0x880000,
						}),
						// TODO: i need to get drunk! get me to the bar!
						new WalkToClosestPoint({
							name: 'WalkToClosestDancefloor',
							entity: this.entity,
							targetType: buliding.DANCEFLOOR,
						})
					]
				})

			}),
		]

		this.tree.root = new b3.MemSequence({
			children: [
				// new WalkRandomAngle({
				// 	entity: this.entity,
				// 	milliseconds: {min:300, max:500},
				// 	addRandom: 1000
				// }),
				new Wait({
					milliseconds: {min:500, max:2000},
				}),
				new RandomChild({
					children: humanNeeds
				}),
				new Wait({
					milliseconds: {min:500, max:2000},
					addRandom: 2000
				}),
				new WalkToRandomPoint({
					entity: this.entity
				})
			]
		})

		this.blackboard = new b3.Blackboard()

		this.hungryTree = new b3.BehaviorTree()
	}

	update(dt, entity) {
		this.tree.tick(entity, this.blackboard)
	}
}