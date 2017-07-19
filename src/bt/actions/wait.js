import Timer from '../../timer'
import Game from '../../game'

class Wait extends b3.Action {
	
	constructor (settings) {
		super(settings)
		
		if(typeof settings.milliseconds === 'object'){
			this.milliseconds = {
				min: settings.milliseconds.min,
				max: settings.milliseconds.max,
			}
		}else{
			this.milliseconds = {
				min: settings.milliseconds || 1000,
				max: settings.milliseconds || 1000,
			}
		}
		this.addRandom = settings.addRandom || 0
	}
	open (tick) {
		this.timer = new Timer(
			Game.rnd.float(this.milliseconds.min, this.milliseconds.max) + Game.rnd.float(0, this.addRandom)
		)
		// console.log('opened wait: ',this.timer.time)
	}
	close (tick) {
		// console.log('closed wait')
		this.timer && this.timer.stop()
		this.timer = undefined
	}
	tick (tick) {
		if (this.timer.finished) {
			return b3.SUCCESS
		}
		return b3.RUNNING
	}

}

Wait.prototype.name = 'WaitRandom'

export default Wait
