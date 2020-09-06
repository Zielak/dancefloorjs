const _timers = []

export default class Timer {
	/**
	 * Creates an instance of Timer.
	 * @param {number} time
	 * @memberof Timer
	 */
	constructor(time = 0) {
		this.counter = 0
		this.time = time
		this.running = true
		this.finished = false
		_timers.push(this)
	}

	stop() {
		if (this.running) {
			this.running = false
			_timers.splice(_timers.indexOf(this), 1)
		}
	}

	/**
	 * Override this function to make it run
	 * once this timer finished ticking
	 *
	 * @memberof Timer
	 */
	run() {}

	_update(dt) {
		this.counter += dt
		if (this.counter >= this.time) {
			this._finish()
		}
	}

	_finish() {
		this.running = false
		this.finished = true
		this.run()
	}

	/**
	 * Call this with given delta
	 *
	 * @static
	 * @param {number} dt delta time since last update
	 * @memberof Timer
	 */
	static update(dt) {
		_timers.forEach((el) => {
			el._update(dt)
		})
	}

	/**
	 * Factory for new Timer instance
	 *
	 * @static
	 * @param {number} time
	 * @param {Function} fun function to call after timer is finished
	 * @returns
	 * @memberof Timer
	 */
	static delay(time, fun) {
		const t = new Timer(time)
		t.run = fun

		return t
	}

	/**
	 * Stops all timers immediatelly, ignoring their results
	 * no callbacks should be called
	 *
	 * @static
	 * @memberof Timer
	 */
	static clear() {
		_timers.forEach((el) => el.stop())
	}
}
