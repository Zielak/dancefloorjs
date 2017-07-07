import * as d3 from 'd3'
import Change from 'chance'
import Actor from '../actor'

const chance = new Chance()

class Human extends Actor {

  constructor({ realname, age, sex, orientation, status, persona }) {
    
    this.realname = realname || 'Dummie'
    this.age = age || chance.floating({min: 16.5, max: 45}) 
    this.sex = sex || chance.bool() ? 'male' : 'female'
    this.orientation = orientation || chance.pickone([
      'hetero', 'homo', 'bi'
    ])
    this.status = status || chance.pickone(['engaged', 'single'])
    this.persona = persona || Persona()
  
    this.width = 12
    this.height = 30

    this.geometry = d3.path.rect(
      -this.width / 2, -this.height,
      this.width, this.height
    )

  }

  init() {

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

  override public function step(dt: Float) {
    super.step(dt);

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
export function Persona({introExtroVert, braveShy, peacefulAggressive}) {
  return new Map([
    ['introExtroVert', introExtroVert || chance.random()],
    ['braveShy', braveShy || chance.random()],
    ['peacefulAggressive', peacefulAggressive || chance.random()],
  ])
}
