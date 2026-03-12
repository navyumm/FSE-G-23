const express = require("express");
require("dotenv").config();
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const schema = require("./schema/schema.js");

const port = process.env.PORT || 8000;
const app = express();


// GraphQL IDE
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.all(
  '/graphql',
  createHandler({
    schema
  })
);



app.listen(port, ()=>{
    console.log(`server is running on port : ${port}`); 
})