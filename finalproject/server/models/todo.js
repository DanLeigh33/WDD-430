const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
   _id: {type: mongoose.Schema.Types.ObjectId},
   id: { type: String, required: true },
   name: { type: String, required: true },
  
});

module.exports = mongoose.model('Todo', todoSchema, "todoitems");