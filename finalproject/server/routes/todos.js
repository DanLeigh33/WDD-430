var express = require('express');
var router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Todo = require('../models/todo');
const { default: mongoose } = require('mongoose');

router.get('/', (req, res, next) => {
    Todo.find()
      .then(todos => {
        res.status(200).json({
            message: 'Todos fetched successfully!',
            todos: todos
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'An error occurred',
          error: error
        });
      });
  });


 router.post('/', (req, res, next) => {
    const maxTodoId = sequenceGenerator.nextId("todos");

    var newId = new mongoose.mongo.ObjectId()
  
    const todo = new Todo({
      _id: newId,
      id: maxTodoId,
      name: req.body.name,
    });
  
    todo.save()
      .then(createdTodo => {
        res.status(201).json({
          message: 'Todo added successfully',
          todo: createdTodo
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


  router.put('/:id', (req, res, next) => {
    Todo.findOne({ id: req.params.id })
      .then(todo=> {
        todo.name = req.body.name,
        
  
        Todo.updateOne({ id: req.params.id }, todo)
          .then(result => {
            res.status(204).json({
              message: "Todo updated successfully"
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Todo not found.',
          error: { document: 'Todo not found'}
        });
      });
  })

  
router.delete("/:id", (req, res, next) => {
    Todo.findOne({ id: req.params.id })
      .then(todo => {
        Todo.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Todo deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Todo not found.',
          error: { document: 'Todo not found'}
        });
      });
  });

module.exports = router; 