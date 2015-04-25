var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    User = require('./models/user'),
    Game = require('./models/game');

var app = express();

var Datastore = require('nedb');
var userDb = new Datastore({filename: 'data/userdata.json', autoload: true});
var gameDb = new Datastore({filename: 'data/gamedata.json', autoload: true});

var port = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// Set swig as the template engine
app.engine('view.html', consolidate['swig']);

// Set views path and view engine
app.set('view engine', 'view.html');
app.set('views', './views');

// Setting the app router and static folder
app.use(express.static(path.resolve('./public')));

//app.route('/users').get(function (req, res) {
//    userDb.find({}, function (err, users) {
//        if(err) res.status(500).json({message: 'Error while getting Users'});
//
//        res.json(users);
//    })
//});

app.route('/users').post(function (req, res) {
    var user = new User(req.body);
    userDb.insert(user, function (err, newDoc) {
        if (err) res.status(500).json({message: 'Error while creating User'});

        res.status(200).json(newDoc);
    });
});

//app.route('/games').get(function (req, res) {
//    gameDb.find({}, function (err, games) {
//        if(err) res.status(500).json({message: 'Error while getting Users'});
//
//        res.json(games);
//    })
//});

app.route('/games').post(function (req, res) {
    var game = new Game(req.body);

    gameDb.insert(game, function (err, newDoc) {
        if (err) res.status(500).json({message: 'Error while creating Game'});

        res.status(200).json(newDoc);
    });
});


app.route('/').get(function (req, res) {
    var allgames, allusers;
    gameDb.find({}, function (err, games) {
        if (err) res.status(500).json({message: 'Error while getting Users'});

        allgames = games;

        userDb.find({}, function (err, users) {
            if(err) res.status(500).json({message: 'Error while getting Users'});

            allusers = users;

            res.render('index', {
                data: {
                    allUsers: allusers,
                    allGames: allgames
                }
            });
        })

    });

});

app.listen(port);
console.log('Listening on port ' + port);
