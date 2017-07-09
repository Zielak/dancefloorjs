import CES from 'ces'
import * as PIXI from 'pixi.js'

import Change from 'chance'
export const rnd = new Chance()

import Vector from './vector'
import * as utils from './utils'

import Human from './human/human'
import HumanSystem from './human/system'

import * as Thirst from './human/thirst'

// EXPORTS

export const gameWidth = document.body.offsetWidth
export const gameHeight = document.body.offsetHeight

export const renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight)
document.body.appendChild(renderer.view)

const _world = new CES.World()
const _stage = new PIXI.Container()

/**
 * Marge of PIXI's Container and CES World class.
 */
export const world = Object.assign(CES.World.prototype, PIXI.Container.prototype, _world, _stage)

// LOCALS

const state = {
	BPM: 128
}

const gameLoop = {
	start: () => {
		document.removeEventListener('click', gameLoop.start)
		prepareECS()
		spawnPeople()
		console.log('Game Loop > started')
		requestAnimationFrame(gameLoop.update)
	},
	update: () => {
		gameLoop.delta = window.performance.now() - gameLoop.lastTime
		if(gameLoop.delta > 1000/50){
			// console.log('Game Loop > stalling: dt = ', gameLoop.delta)
		}

		world.update(gameLoop.delta)
		renderer.render(world)
		requestAnimationFrame(gameLoop.update)
		gameLoop.lastTime = window.performance.now()
	},
	lastTime: null,
	delta: null
}

function prepareECS(){
	world.addSystem(new HumanSystem())
}

function spawnPeople(){
	utils.repeat(10)(spawnGuy)
}

function spawnGuy(){
	new Human({
		pos: new Vector(
			rnd.floating({min:0, max:gameWidth}),
			rnd.floating({min:0, max:gameHeight})
		)
	})
}

export function init(){
	document.addEventListener('click', gameLoop.start)

	// Debug stuff
	document.addEventListener('keydown', keyDownHandler)
}

function keyDownHandler(e){
	switch(e.which){
		case 72: // H
			console.log('All humans: ', world._entities.toArray())
			break
		case 77: // M
			console.log('World: ', world)
			break
	}
}
