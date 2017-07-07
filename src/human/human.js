import Change from 'chance'

import * as Game from '../game'
import Actor from '../actor'

const chance = new Chance()

export default class Human extends Actor {

  constructor({ pos, realname, age, sex, orientation, status, persona }) {
    super({pos})
    
    this.entityId = Game.manager.createEntity(['Thirst'])

    this.realname = realname || 'Dummie'
    this.age = age || chance.floating({min: 16.5, max: 45}) 
    this.sex = sex || chance.bool() ? 'male' : 'female'
    this.orientation = orientation || chance.pickone([
      'hetero', 'homo', 'bi'
    ])
    this.status = status || chance.pickone(['engaged', 'single'])
    this.persona = persona || Persona({})
  
    this.width = 12
    this.height = 30

    this.geometry = Game.screen.path.rect(
      -this.width / 2, -this.height,
      this.width, this.height
    )

  }

  init() {

    this.components.add()
    add(new human.Thirst());
    add(new human.Hunger());
    add(new human.Intoxication());


    add(new components.AIController({ name: 'controller' }));
    add(new components.InputAI({ name: 'input' }));

    add(new components.MoverWalking());

    add(new components.Appearance());


    // Debugging

    add(new components.HumanVisualSelector({ bounds: new Rectangle(0, 0, width, height) }));
  }

  step(dt) {
    super.step(dt)
    stepComponents(dt, attribute);
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
    ['introExtroVert', introExtroVert || chance.random()],
    ['braveShy', braveShy || chance.random()],
    ['peacefulAggressive', peacefulAggressive || chance.random()],
  ])
}
