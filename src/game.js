import CES from 'ces'
import * as PIXI from 'pixi.js'

import Chance from 'chance'
export const rnd = new Chance()
rnd.float = (min, max) => rnd.floating({min, max})
rnd.int = (min, max) => rnd.integer({min, max})

import * as utils from './utils'
import Vector from './vector'
import Timer from './timer'
import pathfinding from './pathfinding'
import building from './building'
import _debugger from './debugger'

import Human from './human/human'

// EXPORTS
export const gameWidth = document.body.offsetWidth
export const gameHeight = document.body.offsetHeight

export const renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight)
document.body.appendChild(renderer.view)

export const world = new CES.World()
export const stage = new PIXI.Container()

/**
 * Container for all UI stuff
 */
export const ui = new PIXI.Container()
stage.addChild(ui)

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
	pause: () => {
		gameLoop.paused = true
		renderer.backgroundColor = 0x666666
		renderer.render(stage)
	},
	resume: () => {
		gameLoop.paused = false
		renderer.backgroundColor = 0
		gameLoop.lastTime = window.performance.now()
		requestAnimationFrame(gameLoop.update)
	},
	update: () => {
		// Break the loop when we hide or paused
		if(document.visibilityState === 'hidden' || gameLoop.paused) return

		// I want that in seconds i guess
		gameLoop.delta = (window.performance.now() - gameLoop.lastTime) / 1000

		Timer.update(gameLoop.delta * 1000)

		world.update(gameLoop.delta)

		stage.children = sortChildren(stage.children)
		ui.children = sortChildren(ui.children)
		stage.setChildIndex(ui, stage.children.length-1)

		pathfinding.calculate()
		_debugger.update()

		renderer.render(stage)

		// Keep the loop going
		requestAnimationFrame(gameLoop.update)
		gameLoop.lastTime = window.performance.now()
	},
	lastTime: null,
	delta: null,
	paused: false,
}

function sortChildren(container){
	return utils.mergeSort(container, (a,b) => {
		return ((a._y || a.y) - (b._y || b.y))
	})
}

function spawnPeople() {
	for (var i = 0; i < 100; i++) {
		spawnGuy()
	}
}

function spawnGuy() {
	new Human({
		pos: new Vector(
			rnd.float(50, gameWidth-50),
			rnd.float(50, gameHeight-50)
		)
	})
}

export function init() {
	_debugger.init(stage)
	building.prepareMap(stage)
	// pathfinding.enableCornerCutting()
	// pathfinding.enableDiagonals()
	gameLoop.start()

	// Keyboard stuff
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
		case 80: // P
			gameLoop.paused ? gameLoop.resume() : gameLoop.pause()
			break
	}
}
