const Joi = require("joi");
const mongoose = require("mongoose");


const todoSchema = new mongoose.Schema({item:String});
const Todo = mongoose.model("Todo",todoSchema);

function validateTodo(todo) {
	const schema = {item:Joi.string().min(1).required()};
	return Joi.validate(todo,schema);
}

module.exports.Todo = Todo;
module.exports.validate = validateTodo;