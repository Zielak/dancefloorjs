import * as b3 from 'behavior3js'
import Component from '../component'
import {world} from '../game'

import Wait from '../bt/actions/wait'
import Logger from '../bt/actions/logger'
import RandomChild from '../bt/composites/random-child'
import Condition from '../bt/decorators/condition'

export default class AIController extends Component {
	constructor(){
		super()

		this.tree = new b3.BehaviorTree()

		const humanNeeds = [
			new Condition({
				checkCondition: () => {
					const hunger = this.entity.getComponent('hunger')
					console.log(`hunger = ${hunger.value}`)
					return hunger.value >= 0.7
				},
				child: new Logger({
					message: 'HUNGRY, lets eat',
					style: 'color: #FFF; font-weight: bold; background-color: #050'
				})
			}),
			// new Logger({
			// 	message: 'THIRSTY',
			// 	style: 'color: #FFF; font-weight: bold; background-color: #05F'
			// }),
			// new Logger({
			// 	message: 'HORNY',
			// 	style: 'color: #FFF; font-weight: bold; background-color: #c0a'
			// }),
			// new Logger({
			// 	message: 'DRINK PLZ',
			// 	style: 'color: #FF0; font-weight: bold; background-color: #800'
			// })
		]

		this.tree.root = new b3.Sequence({
			children: [
				new Wait({
					milliseconds: 3000,
					addRandom: 1000
				}),
				new RandomChild({
					children: humanNeeds
				})
			]
		})



		this.hungryTree = new b3.BehaviorTree()

		this.blackboard = new b3.Blackboard()
	}
	
	update(dt, entity) {
		this.tree.tick(entity, this.blackboard)
	}
}