import CES from 'ces'
import * as PIXI from 'pixi.js'

import Chance from 'chance'
export const rnd = new Chance()

import Vector from './vector'

import Human from './human/human'

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
state

const gameLoop = {
	start: () => {
		document.removeEventListener('click', gameLoop.start)

		document.addEventListener('visibilitychange', () => {
			// Start the loop again when browser tab becomes active
			if(document.visibilityState === 'visible'){
				gameLoop.resume()
			}
		})

		spawnPeople()
		console.log('Game Loop > started')
		gameLoop.resume()
	},
	resume: () => {
		gameLoop.lastTime = window.performance.now()
		requestAnimationFrame(gameLoop.update)
	},
	update: () => {
		// Break the loop when we hide
		if(document.visibilityState === 'hidden') return

		gameLoop.delta = window.performance.now() - gameLoop.lastTime

		world.update(gameLoop.delta)
		renderer.render(world)

		// Keep the loop going
		requestAnimationFrame(gameLoop.update)
		gameLoop.lastTime = window.performance.now()
	},
	lastTime: null,
	delta: null
}

function spawnPeople() {
	for (var i = 0; i < 100; i++) {
		spawnGuy()
	}
}

function spawnGuy() {
	new Human({
		pos: new Vector(
			rnd.floating({ min: 0, max: gameWidth }),
			rnd.floating({ min: 0, max: gameHeight })
		)
	})
}

export function init() {
	// document.addEventListener('click', gameLoop.start)
	gameLoop.start()

	// Debug stuff
	document.addEventListener('keydown', keyDownHandler)
}

function keyDownHandler(e) {
	switch (e.which) {
		case 72: // H
			console.log('All humans: ', world._entities.toArray())
			break
		case 77: // M
			console.log('World: ', world)
			break
	}
}
