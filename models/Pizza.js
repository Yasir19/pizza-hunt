const { Schema, model} = require('mongoose')
const pizzaSchema = new Schema({
// name for the pizza
pizzaName:{
    type:String
},
//name of the user that create pizza 
createdBy:{
    type:String
},
// a timestamp of when the pizza was created 
//a timestamp of any update to the pizza data 
createdAt:{
    type:Date,
    default: Date.now
},
// the pizza suggested size 
size: {
type:String,
default: 'Large'
},
// the pizza topings 
toppings:[]
});

// create the pizza model using the pizzaSchema 
const Pizza = model('Pizza', pizzaSchema);
// export the Pizza model 
module.exports = Pizza;

