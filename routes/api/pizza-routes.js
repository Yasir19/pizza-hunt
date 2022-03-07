const router = require('express').Router();
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// set up Get all and Post at/api/pizzas
router
.route('/')
// provide the name of the controller method as the callback 
.get(getAllPizza)
.post(createPizza);

// set up GET one, PUT and DELETE ar /api/pizzas/:id
router
.route('/:id')
// provide the name of the controller method as the callback
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router