import test from 'ava'
import building from '../src/building'
import {
	FLOOR,
	// WALL,
	// DANCEFLOOR,
	// DRINKBAR,
	// FOODBAR,
} from '../src/building'

test.beforeEach(() => {
	building.prepareMap()
})

test('#getClosestPoint', t => {
	console.log(building.getClosestPoint(0,0,FLOOR))
})
