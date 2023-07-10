const mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    maxTodoId: {type: Number}
});

module.exports = mongoose.model('Sequence', sequenceSchema, "sequences");