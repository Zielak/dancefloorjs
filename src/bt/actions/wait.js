import Timer from "../../timer"
import rnd from "../../utils/rnd"

class Wait extends b3.Action {
	constructor(settings) {
		super({ settings, name: "WaitRandom" })

		if (typeof settings.milliseconds === "object") {
			this.milliseconds = {
				min: settings.milliseconds.min,
				max: settings.milliseconds.max,
			}
		} else {
			this.milliseconds = {
				min: settings.milliseconds || 1000,
				max: settings.milliseconds || 1000,
			}
		}
		this.addRandom = settings.addRandom || 0
	}
	open(tick) {
		const { min, max } = this.milliseconds
		this.timer = new Timer(
			rnd.floating({ min, max }) + rnd.floating({ min: 0, max: this.addRandom })
		)
		// console.log('opened wait: ',this.timer.time)
	}
	close(tick) {
		// console.log('closed wait')
		this.timer && this.timer.stop()
		this.timer = undefined
	}
	tick(tick) {
		if (this.timer.finished) {
			return b3.SUCCESS
		}
		return b3.RUNNING
	}
}

export default Wait
