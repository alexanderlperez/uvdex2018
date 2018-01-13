'use strict;'

const path = require('path');
const mongo = require('mongodb');
const express = require('express');
const app = express();
require('dotenv').load();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/../../client/public'));

app.get('/admin', function (req, res) {
    res.render('index');
})

app.get('/admin/list-users', function (req, res) {
    mongo.MongoClient.connect('mongodb://' + process.env.MONGO_HOST + ':27017', function (err, client) {
        if (err) {
            res.status(500).send("Error" + err);
            return;
        }

        client.db('wtf').collection('Users', function (err, collection) {
            collection.find({}).toArray(function (err, users) {
                res.render('users', {
                    users: users.map(user => ({
                        name: fallbackUsername(user),
                            id: user._id
                    }))
                });
            })
        })
    })
})

app.get('/admin/user/:id', function (req, res) {
    mongo.MongoClient.connect('mongodb://' + process.env.MONGO_HOST + ':27017', function (err, client) {
        if (err) {
            res.status(500).send("Error" + err);
            return;
        }

        client.db('wtf').collection('Users', function (err, collection) {
            collection.findOne({ "_id": new mongo.ObjectID(req.params.id) }, function (err, user) {
                res.render('user-details', {
                    name: fallbackUsername(user),
                    user: user
                });
            })
        })
    })
})

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'))
})

console.log('Listening in port', process.env.PORT);
app.listen(process.env.PORT);

