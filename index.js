const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config()
const port = 5000
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.7oely.mongodb.net/${process.env.DB_Name}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const products = client.db("emaJhonDB").collection("products");

    app.post('/addProducts', (req, res) => {
        const product = req.body;
        products.insertOne(products)
        .then(result=>{
            console.log(result);
        })
    })

    console.log('db connected');
});


app.get('/', (req, res) => {
    res.send("Hlw NODE JS");
})

// app.listen(port);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})