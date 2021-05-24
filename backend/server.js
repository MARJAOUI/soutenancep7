/// importations
const http =require('http');
const app = require('./app');
const express = require('express');
const bodyParser = require('body-parser');
const messageRouter = require('./routes/message').router;
const userRouter = require('./routes/user').router;


// instancations serveur

const server = express();

// configuration du serveur
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})
// body-parser configuration
server.use(bodyParser.json());

server.get ('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon premier Server local</h1>'); /// texte à afficher sur page pour des tests
});

// configuration des routes
server.use('/api', userRouter);
server.use('/api', messageRouter);
server.use(express.static("images"));


// lancement du server
server.listen(3000, function() {
    console.log('server en écoute');     ///  affichages console
    console.log('mon serveur fonctionne');
});

module.exports = server;


