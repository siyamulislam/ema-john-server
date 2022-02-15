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
    const productsCollections = client.db("emaJhonDB").collection("products");
    app.post('/addProducts', (req, res) => {
        const products = req.body;
        productsCollections.insertMany(products)
        .then(result=>{
            console.log(result);
            res.send(result.acknowledged)
        })
        // productsCollections.insertOne(product)
        // .then(result=>{
        //    res.send(result.acknowledged)
        // })
    })
    app.get('/products', (req, res) => {
        productsCollections.find({}).limit(20)
        .toArray((err,documents)=>{
            res.send(documents)
        })
    })
    app.get('/product/:key', (req, res) => {
        productsCollections.find({key:req.params.key})
        .toArray((err,documents)=>{
            res.send(documents[0])
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