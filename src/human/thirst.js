export const Component = {
	name: 'Thirst',
	state: {
		value: 0
	}
}

export class Processor {
	constructor(manager){
		this.manager = manager
		console.log('Component created > ', this)
	}

	update(dt){
		this.manager.getComponentsData('Thirst').forEach(data =>{
			console.log('data:', data)
		})
	}
}


