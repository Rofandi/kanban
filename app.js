"use strict"

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
console.log('Hello World');
module.exports = app