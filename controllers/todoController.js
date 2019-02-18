const mongoose = require("mongoose");
const config = require("config");
const {
	Todo,validate
} = require("../models/todos");

//Connect to mongodb
const db = config.get("db");
mongoose.connect(db,{ useNewUrlParser: true });

module.exports = function (app) {

	app.get("/todo", async (req,res)=>{
		const data = await Todo.find();

		res.render("todo",{todos:data});
	});
  
	app.post("/todo", async (req,res)=>{
		const { error } = validate(req.body);
		if(error) return res.status(400).send(error.details[0].message);

		const newTodo = new Todo({item:req.body.item});

		await newTodo.save();

		res.send(newTodo);
	});
  
	app.delete("/todo/:id", async (req,res)=>{
		const todoitem = await Todo.findByIdAndDelete(req.params.id);

		if (!todoitem) return res.status(404).send("The item with the given ID was not found.");
				
		res.send(todoitem);
	});

	app.get("/todo/todoitems", async (req,res)=>{
		const todos = await Todo.find();

		res.send(todos);
	});

	app.get("/todo/:id", async (req,res)=>{
		const todoitem = await Todo.findById(req.params.id);

		if (!todoitem) return res.status(404).send("The item with the given ID was not found.");

		res.send(todoitem);
	});
};