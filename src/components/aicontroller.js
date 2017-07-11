import Component from '../component'
import * as b3 from 'behavior3js'

import Wait from '../bt/actions/wait'

export default class AIController extends Component {
	constructor(){
		super()
		this.tree = new b3.BehaviorTree()
		this.tree.root = new b3.Sequence({
			children: [
				new Wait({
					milliseconds: 5000,
					addRandom: 1000
				}) 
			]
		})

		this.blackboard = new b3.Blackboard()
	}
	
	update(dt, entity) {
		this.tree.tick(entity, this.blackboard)
	}
}