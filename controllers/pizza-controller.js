const { Pizza } = require('../models');
const pizzaController = {
    // endpoint function as methods that work a callback function for the express.js
    // find method 
    //1-(get all pizzas)
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //2- find one pizza by id 
    getPizzaById({params},res) {
        Pizza.findOne({_id:params.id})
        .then(dbPizzaData => {
            // if ni pizza was found, sent 404
            if(!dbPizzaData){
                res.status(404).json({message:'No pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    // create method 
    createPizza({ body }, res) {
        console.log(body);
        Pizza.create(body)
          .then(dbPizzaData => res.json(dbPizzaData))
          .catch(err => res.status(400).json(err));
    },
    // put method 
    updatePizza({body ,params}, res) {
        Pizza.findOneAndUpdate({_id:params.id}, body , {new: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(400).json({message: 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400). json(err));

    },
    //delete method 
    deletePizza({params}, res){
        Pizza.findOneAndDelete({_id:params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData){
                res.status(404).json({message: 'No pizzw found with this id!'})
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));


    }
}
module.exports = pizzaController