import test from "ava"
import Timer from "../src/timer"

let timer

test.beforeEach(() => {
	Timer.clear()
	timer = new Timer()
})

test("constructor", (t) => {
	t.is(timer.counter, 0)
	t.is(timer.time, 0)
	t.is(timer.running, true)
	t.is(timer.finished, false)
	// Timer
})
