/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;

  this.getArea = () => this.width * this.height;
}

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const resJson = JSON.parse(json);
  Object.setPrototypeOf(resJson, proto);
  return resJson;
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  string: '',
  allElements: [0],
  element(value) {
    this.errorReport('elem');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'elem';
    newObj.string = this.string + value;
    this.allElements.push(1);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  id(value) {
    this.errorReport('id');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'id';
    newObj.string = `${this.string}#${value}`;
    this.allElements.push(2);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  class(value) {
    this.errorReport('class');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'class';
    newObj.string = `${this.string}.${value}`;
    this.allElements.push(3);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  attr(value) {
    this.errorReport('attr');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'attr';
    newObj.string = `${this.string}[${value}]`;
    this.allElements.push(4);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  pseudoClass(value) {
    this.errorReport('pseudoClass');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'pseudoClass';
    newObj.string = `${this.string}:${value}`;
    this.allElements.push(5);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  pseudoElement(value) {
    this.errorReport('pseudoElement');
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.value = 'pseudoElement';
    newObj.string = `${this.string}::${value}`;
    this.allElements.push(6);
    newObj.arrElements = this.allElements;
    this.errorMessage();
    return newObj;
  },

  combine(selector1, combinator, selector2) {
    const newObj = constructor.create(cssSelectorBuilder);
    newObj.string = `${selector1.string} ${combinator} ${selector2.string}`;
    return newObj;
  },

  stringify() {
    return this.string;
  },

  errorReport(value) {
    if (this.value === value) {
      if (value === 'elem' || value === 'id' || value === 'pseudoElement') {
        throw new Error(
          // eslint-disable-next-line comma-dangle
          'Element, id and pseudo-element should not occur more then one time inside the selector'
        );
      }
    }
  },
  errorMessage() {
    if (this.arrElements) {
      const one = this.arrElements[this.arrElements.length - 1];
      const two = this.arrElements[this.arrElements.length - 2];
      if (one < two) {
        throw new Error(
          // eslint-disable-next-line comma-dangle
          'Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element'
        );
      }
    }
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
