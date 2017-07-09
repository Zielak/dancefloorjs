
export default class Vector {

  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }

  get length(){
    return
  }
  set length( value ) {
    this.normalize().multiplyScalar( value );
    return value;
  }

  set_xy(x, y) {
    this.x = x
    this.y = y
    return this
  }

  /**
   * 
   * 
   * @param {number} _dest_x 
   * @param {number} _dest_y 
   * @param {number} _t 
   * @returns this
   * @memberof Vector
   */
  lerp_xy(_dest_x, _dest_y, _t) {
    return this.set_xy(Math.lerp(this.x, _dest_x, _t), Math.lerp(this.y, _dest_y, _t))
  }

  /**
   * 
   * 
   * @param {Vector} _other 
   * @param {number} _t 
   * @returns this
   * @memberof Vector
   */
  lerp(_other, _t) {
    return this.set_xy(Math.lerp(this.x, _other.x, _t), Math.lerp(this.y, _other.y, _t))
  }

  /**
   * Rounds vector coordinated to "integers"
   * 
   * @returns 
   * @memberof Vector
   */
  round() {
    return this.set_xy(Math.round(this.x), Math.round(this.y))
  }

  /**
   * 
   * 
   * @param {Vector} other 
   * @returns 
   * @memberof Vector
   */
  equals(other) {
    return (this.x === other.x && this.y === other.y);
  }

  /**
   * 
   * 
   * @returns {Vector}
   * @memberof Vector
   */
  clone() {
    return new Vector(this.x, this.y)
  }

  toString() {
    return "{ x:" + this.x + ", y:" + this.y + ", z:" + this.z + " }"
  }

  // OPERATIONS

  add(other) {
    return this.set_xy( this.x + other.x, this.y + other.y )
  }

  subtract(other) {
    return this.set_xy( this.x - other.x, this.y - other.y )
  }

  multiply(other) {
    return this.set_xy( this.x * other.x, this.y * other.y )
  }

  divide(other) {
    return this.set_xy( this.x / other.x, this.y / other.y )
  }

  addScalar(v){
    return this.set_xy(this.x + v, this.y + v)
  }
  subtractScalar(v){
    return this.set_xy(this.x - v, this.y - v)
  }
  multiplyScalar(v) {
    return this.set_xy(this.x * v, this.y * v)
  }
  divideScalar(v) {
    v != 0 ? this.set_xy(this.x / v, this.y / v) : this.set_xy(0, 0)
    return this
  }


  get normalized(){
    return this.clone().normalize()
  }
  normalize() {
    return this.divideScalar( this.length )
  }

  get inverted(){
    return new Vector(-this.x, -this.y)
  }

  /**
   * Changes the angle of the vector.
   * X and Y will change, length stays the same.
   * 
   * @memberof Vector
   */
  set angle2D(v){
    this.set_xy( Math.cos(v) * this.length, Math.sin(v) * this.length )
  }
  get angle2D(){
    return Math.atan2(this.y, this.x)
  }
}
