const express = require('express');
require('dotenv').config();
const mainRouter = require('./routers')

// DB connection
require('./db_connection');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
  next();
});

// Router
app.use("/api/", mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something is broken!");
});

require('./events/eventListener.js');

app.listen(port, () => {
  console.log("Express server is running on port", port)
}
);
