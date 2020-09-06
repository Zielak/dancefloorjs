import Component from "../component"
import Game from "../game"
import buliding from "../building"

import {
	Wait,
	Logger,
	WalkRandomAngle,
	WalkToClosestPoint,
	WalkToRandomPoint,
	WalkTo,
} from "../bt/actions"
import RandomChild from "../bt/composites/random-child"
import Condition from "../bt/decorators/condition"

export default class AIController extends Component {
	constructor() {
		super("aicontroller")
	}

	addedToEntity() {
		this.tree = new b3.BehaviorTree()

		const humanNeedsTree = [
			// HUNGER
			new Condition({
				name: "Hunger",
				checkCondition: () => {
					const hunger = this.entity.getComponent("hunger")
					return hunger.value >= Game.rnd.float(0.7, 0.85)
				},
				child: new b3.MemSequence({
					children: [
						new Logger({
							message: "HUNGRY, lets eat",
							entity: this.entity,
							textStyle: { fill: 0xffffff, fontWeight: "bold" },
							background: 0x005500,
						}),
						new WalkToClosestPoint({
							name: "WalkToClosestFoodbar",
							entity: this.entity,
							targetType: buliding.FOODBAR,
						}),
					],
				}),
			}),
			// THIRST
			new Condition({
				name: "Thirst",
				checkCondition: () => {
					const thirst = this.entity.getComponent("thirst")
					return thirst.value >= Game.rnd.float(0.7, 0.85)
				},
				child: new b3.MemSequence({
					children: [
						new Logger({
							message: "THIRSTY",
							entity: this.entity,
							textStyle: { fill: 0xffffff, fontWeight: "bold" },
							background: 0x0055ff,
						}),
						new WalkToClosestPoint({
							name: "WalkToClosestDrinkbar",
							entity: this.entity,
							targetType: buliding.DRINKBAR,
						}),
					],
				}),
			}),
			// INTOXICATION
			/*new Condition({
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

			}),*/
		]

		const idleTree = [
			// new Wait({
			// 	milliseconds: {min:500, max:2000},
			// 	addRandom: 2000
			// }),
			new WalkToRandomPoint({
				name: "Walk Random",
				entity: this.entity,
			}),
			new WalkRandomAngle({
				entity: this.entity,
				milliseconds: { min: 300, max: 500 },
				addRandom: 500,
			}),
		]

		this.tree.root = new b3.MemSequence({
			children: [
				new Wait({
					milliseconds: { min: 500, max: 2000 },
				}),
				new RandomChild({
					name: "Check Human Needs",
					children: humanNeedsTree,
				}),
				new RandomChild({
					name: "Act Idle",
					children: idleTree,
				}),
			],
		})

		this.blackboard = new b3.Blackboard()
	}

	update(dt, entity) {
		this.tree.tick(entity, this.blackboard)
	}
}
