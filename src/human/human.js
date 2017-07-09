import {Graphics} from 'pixi.js'

import {manager, rnd} from '../game'
import Actor from '../actor'

import Thirst from './thirst'


export default class Human extends Actor {

  constructor({ pos, realname, age, sex, orientation, status, persona }) {
    super({pos})
    
    // this.entityId = manager.createEntity(['Thirst'])

    this.realname = realname || 'Dummie'
    this.age = age || rnd.floating({min: 16.5, max: 45}) 
    this.sex = sex || rnd.bool() ? 'male' : 'female'
    this.orientation = orientation || rnd.pickone([
      'hetero', 'homo', 'bi'
    ])
    this.status = status || rnd.pickone(['engaged', 'single'])
    this.persona = persona || Persona({})
  
    this.width = 12
    this.height = 30

    // TODO: get some better color management. HSL and random hues plz
    this.geometry = new Graphics()
    this.geometry
      .beginFill(rnd.color({format: 'hex'}))
      .drawRect(-this.width / 2, -this.height, this.width, this.height)
      .endFill()

  }

  init() {
    super.init()
    this.addComponent(new Thirst())
    // this.addComponent(new Hunger())
    // this.addComponent(new Intoxication())


    // add(new components.AIController({ name: 'controller' }));
    // add(new components.InputAI({ name: 'input' }));

    // add(new components.MoverWalking());

    // add(new components.Appearance());


    // Debugging
    // add(new components.HumanVisualSelector({ bounds: new Rectangle(0, 0, width, height) }));
  }

}

/**
 * Static characteristics of a person
 * Intro/Extrovert, Brave/Shy, Peaceful/Aggressive etc.
 * Values usually in range of <0...1>
 * 
 * @export
 * @param {any} {introExtroVert, braveShy, peacefulAggressive} 
 * @returns {Map}
 */
function Persona({introExtroVert, braveShy, peacefulAggressive}) {
  return new Map([
    ['introExtroVert', introExtroVert || rnd.random()],
    ['braveShy', braveShy || rnd.random()],
    ['peacefulAggressive', peacefulAggressive || rnd.random()],
  ])
}
