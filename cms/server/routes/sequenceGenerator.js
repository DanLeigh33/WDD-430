const  sequence  = import('@angular/animations');
var Sequence = require('../models/sequence');

var maxDocumentId;
var maxMessageId;
var maxContactId;
var sequenceId;

function SequenceGenerator() {

  Sequence.findOne()
  .then(sequence => {
    sequenceId = sequence._id;
    maxDocumentId = sequence.maxDocumentId;
    maxMessageId = sequence.maxMessageId;
    maxContactId = sequence.maxContactId;
  })
  .catch(err => {
    console.log(err);
  })
    //.exec(function(err, sequence) {
      //if (err) {
        //return res.status(500).json({
          //title: 'An error occurred',
          //error: err
        //});
      //}

      //sequenceId = sequence._id;
      //maxDocumentId = sequence.maxDocumentId;
      //maxMessageId = sequence.maxMessageId;
      //maxContactId = sequence.maxContactId;
    //});
}

SequenceGenerator.prototype.nextId = function(collectionType) {

  var updateObject = {};
  var nextId;

  switch (collectionType) {
    case 'documents':
      maxDocumentId++;
      updateObject = {maxDocumentId: maxDocumentId};
      nextId = maxDocumentId;
      break;
    case 'messages':
      maxMessageId++;
      updateObject = {maxMessageId: maxMessageId};
      nextId = maxMessageId;
      break;
    case 'contacts':
      maxContactId++;
      updateObject = {maxContactId: maxContactId};
      nextId = maxContactId;
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
