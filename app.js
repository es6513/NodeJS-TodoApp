const express = require("express");
const todoController = require("./controllers/todoController");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const app = express();

//set for production
app.use(helmet());
app.use(compression());

//set cors
app.use(cors());

//set pug

app.set("view engine","pug");

//static files
app.use(express.static("./public"));
app.use(require("body-parser").json());

todoController(app);

// port
const port = process.env.PORT || 3000;
app.listen(port);

console.log(`You are listening to port ${port}`); 