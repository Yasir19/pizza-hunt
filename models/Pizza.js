const { Schema, model} = require('mongoose')
const dateFormat = require('../utils/dateFormat');
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
    default: Date.now,
    get:(createdArVal) => dateFormat(createdArVal)
},
// the pizza suggested size 
size: {
type:String,
default: 'Large'
},
// the pizza topings 
toppings:[],
comments:[
    {
        type:Schema.Types.ObjectId,
        ref: 'Comment'
    }
]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }, 
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
}
);
//use virtual to get the totoal count of comment abd replies on retrieval 
pizzaSchema.virtual('commentCount').get(function(){
    return this.comments.length
});

// create the pizza model using the pizzaSchema 
const Pizza = model('Pizza', pizzaSchema);
// export the Pizza model 
module.exports = Pizza;

