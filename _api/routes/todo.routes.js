module.exports = (app) => {
  const todo = require('../controllers/todo.controller.js')

  var router = require('express').Router()

  // Create a new todo
  router.post('/', todo.create)

  // Retrieve all todo
  router.get('/', todo.findAll)

  // Retrieve a single todo with id
  router.get('/:id', todo.findOne)

  // Update a todo with id
  router.put('/:id', todo.update)

  // Delete a todo with id
  router.delete('/:id', todo.delete)

  // Delete all todos
  router.delete('/', todo.deleteAll)

  app.use('/api/todo', router)
}
