// External dependencies
import CES from "ces"
import { autoDetectRenderer, Container } from "pixi.js"

// Internal dependencies
import Vector from "./vector"
import Timer from "./timer"
import pathFinding from "./pathFinding"
import building from "./building"
import visualDebugger from "./visualDebugger"

import Human from "./human/human"
import { gridPos2WorldPos } from "./utils/location"
import { sortChildren } from "./utils/sorting"
import rnd from "./utils/rnd"

export const GAME_WIDTH = document.body.offsetWidth
export const GAME_HEIGHT = document.body.offsetHeight

class Game {
	state = {
		BPM: 128,

		lastTime: null,
		delta: null,
		paused: false,
	}

	constructor() {
		this.world = new CES.World()

		this.renderer = autoDetectRenderer({
			width: GAME_WIDTH,
			height: GAME_HEIGHT,

			antialias: false,
		})
		document.body.appendChild(this.renderer.view)

		this.stage = new Container()

		this.ui = new Container()
		this.stage.addChild(this.ui)
	}

	/**
	 * Starts the game loop, initializes other mechanics
	 */
	init() {
		visualDebugger.init(this.stage)
		building.prepareMap(this.stage)
		// pathFinding.enableCornerCutting()
		pathFinding.enableDiagonals()

		this.start()

		// Keyboard stuff
		document.addEventListener("keydown", this._keyDownHandler.bind(this))
	}

	_keyDownHandler(e) {
		switch (e.which) {
			case 72: // H
				console.log("All humans: ", this.world._entities.toArray())
				break
			case 77: // M
				console.log("World: ", this.world)
				break
			case 80: // P
				this.state.paused ? this.resume() : this.pause()
				break
		}
	}

	/**
	 * Starts the game with bunch of people
	 */
	start() {
		// Start the loop again when browser tab becomes active
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				this.resume()
			}
		})
		const spawnGuy = (point) =>
			new Human({
				pos: new Vector(point.x, point.y),
				bounds: building.bounds,
			})

		const spawnPeople = () => {
			for (let i = 0; i < 10; i++) {
				const randomPlace = gridPos2WorldPos(
					rnd.pickone(building._.getAllPoints())
				)
				if (i === 0) {
					this.stage.emit("updateHumanDebugger", spawnGuy(randomPlace))
				} else {
					spawnGuy(randomPlace)
				}
			}
		}

		spawnPeople()

		console.log("Game Loop > started")
		this.resume()
	}

	/**
	 * Pauses the game loop
	 */
	pause() {
		console.log("PAUSE")
		this.state.paused = true
		this.renderer.backgroundColor = 0x666666
		this.renderer.render(this.stage)
	}

	/**
	 * Resumes the game loop
	 */
	resume() {
		console.log("RESUME")
		this.state.paused = false
		this.renderer.backgroundColor = 0
		this.state.lastTime = window.performance.now()
		requestAnimationFrame(this.update.bind(this))
	}

	update() {
		const { state, world, ui, stage } = this

		// Break the loop when we hide or paused
		if (document.visibilityState === "hidden" || state.paused) return

		// I want that in seconds i guess
		state.delta = (window.performance.now() - state.lastTime) / 1000

		Timer.update(state.delta * 1000)

		world.update(state.delta)

		// Sort children
		stage.children = sortChildren(stage.children)
		ui.children = sortChildren(ui.children)
		stage.setChildIndex(ui, stage.children.length - 1)

		pathFinding.calculate()
		visualDebugger.update()

		this.renderer.render(stage)

		// Keep the loop going
		requestAnimationFrame(this.update.bind(this))
		state.lastTime = window.performance.now()
	}
}

export default new Game()
