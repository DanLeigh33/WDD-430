const  sequence  = import('@angular/animations');
var Sequence = require('../models/sequence');

var maxTodoId;
var sequenceId;

function SequenceGenerator() {

  Sequence.findOne()
  .then(sequence => {
    sequenceId = sequence._id;
    maxTodoId = sequence.maxTodoId;
  })
  .catch(err => {
    console.log(err);
  })
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'todos':
      maxTodoId++;
      updateObject = {maxTodoId: maxTodoId};
      nextId = maxTodoId;
      break;
    default:
      return -1;
  }

  Sequence.updateOne({_id: sequenceId}, {$set: updateObject})
  .catch(err => {
    console.log("nextId error = " + err);
  })

  return nextId;
}

module.exports = new SequenceGenerator();