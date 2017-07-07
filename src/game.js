import EntityManager from 'ensy'
import * as d3 from 'd3'

import Change from 'chance'
const chance = new Chance()

import Vector from './vector'
import * as utils from './utils'
import Human from './human/human'

import * as Thirst from './human/thirst'

export let screen
export let width
export let height

const state = {
	BPM: 128
}

function startLoop(){
	document.removeEventListener('click', startLoop)
	// Start the main loop of the game.
	requestAnimationFrame(animate);
	function animate() {
			requestAnimationFrame(animate);
			manager.update();
	}
}

function prepareComponents(){
	[Thirst].forEach(comp => {
		manager.addComponent(comp.Component.name, comp.Component)
		manager.addProcessor(new comp.Processor(manager))
	})
}

function spawnPeople(){
	utils.repeat(10)(spawnGuy)
}

function spawnGuy(){
	new Human({
		pos: new Vector(
			chance.floating({min:0, max:width}),
			chance.floating({min:0, max:width})
		)
	})
}

function spawnAreas(){
	
}

export const manager = new EntityManager()

export function init({_width, _height, _screen}){
	width = _width
	height = _height
	screen = _screen

	prepareComponents()

	spawnPeople()

	document.addEventListener('click', startLoop)
}

