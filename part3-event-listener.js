// Approach#1

// const EventEmitter = require('events');
// const myEmitter = new EventEmitter();

// Approach#2

const EventEmitter = require('events');
class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

///////////////////////
// Observer Pattern

///////////////////
// Observer/Listener
// activates when 'newSale' gets emit
myEmitter.on('newSale', () => {
  console.log('There is a new sale!');
});

///////////////////
// Observer/Listener
// activates when 'newSale' gets emit
myEmitter.on('newSale', () => {
  console.log('Customer name: Jonas');
});

///////////////////
// Observer/Listener
// activates when 'newSale' gets emit
// stock1 = Hey!
// stock2 = 9
// stock3 = 5
myEmitter.on('newSale', (stock1, stock2, stock3) => {
  console.log(`${stock1}, There are now ${stock3} items left in stock`);
});

/////////////////////
// Emitter
// emits 'newSale'
myEmitter.emit('newSale', 'Hey!', 9, 5);
