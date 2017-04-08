var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    BusStopController = require('./controllers/busStops'),
    StopTimeController = require('./controllers/stopTime'),
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        todoRoutes = express.Router(),
        busstopRoutes = express.Router(),
        stopTimeRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    
    //Bus stop routes
    apiRoutes.use('/busStop',busstopRoutes);
    //busstopRoutes.get('/',BusStopController.getStopTimes);
    busstopRoutes.get('/:lat/:lng',BusStopController.getStops);

    apiRoutes.use('stopTimes',stopTimeRoutes);
    stopTimeRoutes.get('/list:trip_id',StopTimeController.getStopTimes);
    stopTimeRoutes.get('/single:stop_id', StopTimeController.getTrip);
    //Will only trigger if user successfully logs in
    // Todo Routes
    apiRoutes.use('/todos', todoRoutes);
    
    //Only user with [reader,creator,editor] can trigger (retrieve from db)
    todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    //Only user with creator or editor cna use (Will post to db)
    todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    //Only editors can trigger. (Will delete from db)
    todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}