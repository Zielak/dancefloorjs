// External dependencies
import CES from 'ces'
import {Container, autoDetectRenderer} from 'pixi.js'
import Chance from 'chance'

const rnd = new Chance()
rnd.float = (min, max) => rnd.floating({ min, max })
rnd.int = (min, max) => rnd.integer({ min, max })

// Internal dependencies
import * as utils from './utils'
import Vector from './vector'
import Timer from './timer'
import pathfinding from './pathfinding'
import building from './building'
import visualDebugger from './visualDebugger'

import Human from './human/human'

const gameWidth = document.body.offsetWidth
const gameHeight = document.body.offsetHeight

const renderer = autoDetectRenderer(gameWidth, gameHeight)
document.body.appendChild(renderer.view)

const world = new CES.World()
const stage = new Container()

/**
 * Container for all UI stuff
 */
const ui = new Container()
stage.addChild(ui)

const state = {
	BPM: 128,

	lastTime: null,
	delta: null,
	paused: false,
}

/**
 * Stards the game with bunch of people
 * 
 */
function start() {
	document.removeEventListener('click', start)

	// Start the loop again when browser tab becomes active
	document.addEventListener('visibilitychange', () => {
		if (document.visibilityState === 'visible') {
			resume()
		}
	})
	const spawnGuy = point => new Human({
		pos: new Vector(point.x, point.y)
	})
	
	const spawnPeople = () => {
		for (let i = 0; i < 10; i++) {
			const randomPlace = utils.gridPos2WorldPos(rnd.pickone(building._.getAllPoints()))
			if (i === 0) {
				stage.emit('updateHumanDebugger', spawnGuy(randomPlace))
			} else {
				spawnGuy(randomPlace)
			}
		}
	}

	spawnPeople()

	console.log('Game Loop > started')
	resume()
}

/**
 * Pauses the game loop
 */
function pause() {
	state.paused = true
	renderer.backgroundColor = 0x666666
	renderer.render(stage)
}

/**
 * Resumes the game loop
 */
function resume() {
	state.paused = false
	renderer.backgroundColor = 0
	state.lastTime = window.performance.now()
	requestAnimationFrame(update)
}

function update() {
	// Break the loop when we hide or paused
	if (document.visibilityState === 'hidden' || state.paused) return

	// I want that in seconds i guess
	state.delta = (window.performance.now() - state.lastTime) / 1000

	Timer.update(state.delta * 1000)

	world.update(state.delta)

	// Sort children
	stage.children = utils.sortChildren(stage.children)
	ui.children = utils.sortChildren(ui.children)
	stage.setChildIndex(ui, stage.children.length - 1)

	pathfinding.calculate()
	visualDebugger.update()

	renderer.render(stage)

	// Keep the loop going
	requestAnimationFrame(update)
	state.lastTime = window.performance.now()
}

/**
 * Starts the game loop, initializes other mechanics
 */
function init() {
	visualDebugger.init(stage)
	building.prepareMap(stage)
	// pathfinding.enableCornerCutting()
	pathfinding.enableDiagonals()
	start()

	// Keyboard stuff
	document.addEventListener('keydown', _keyDownHandler)
}

function _keyDownHandler(e) {
	switch (e.which) {
		case 72: // H
			console.log('All humans: ', world._entities.toArray())
			break
		case 77: // M
			console.log('World: ', world)
			break
		case 80: // P
			state.paused ? resume() : pause()
			break
	}
}


export default {
	gameWidth,
	gameHeight,
	renderer,
	world,
	stage,
	ui,
	rnd,

	init,
}
