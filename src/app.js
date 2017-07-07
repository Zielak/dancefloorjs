import './math'
import * as d3 from 'd3'
import * as Game from './game'

const gameWidth = document.body.offsetWidth
const gameHeight = document.body.offsetHeight

function prepareScreen(){
	return d3.select('body').append('svg')
		.attr('width', gameWidth)
		.attr('height', gameHeight)
}

Game.init({
	_width: gameWidth,
	_height: gameHeight,
	_screen: prepareScreen()
})
