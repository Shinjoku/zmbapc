var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Survivor = require('./survivors/api/models/survivorsModel'),
    bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/survivors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./survivors/api/routes/survivorsRoutes');
routes(app);

app.listen(port);

console.log('Server aberto na porta: ' + port);