var AuthenticationController = require('./controllers/authentication'),  
    TodoController = require('./controllers/todos'),  
    BusStopController = require('./controllers/busStops'),
    StopTimeController = require('./controllers/stopTime'),
    ShapesController = require('./controllers/shapes'),
    ReviewController = require('./controllers/reviews'),
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
        stopTimeRoutes = express.Router(),
        shapeRoutes = express.Router(),
        reviewRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register);
    authRoutes.post('/login', requireLogin, AuthenticationController.login);
    
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
    
    //Bus-Stop routes
    apiRoutes.use('/busStop',busstopRoutes);
    //busstopRoutes.get('/',BusStopController.getStopTimes);
    busstopRoutes.get('/:lat/:lng',BusStopController.getStops);

    //StopTime routes
    apiRoutes.use('/stopTimes',stopTimeRoutes);
    stopTimeRoutes.get('/list:trip_id',StopTimeController.getStopTimes);
    stopTimeRoutes.get('/single:stop_id', StopTimeController.getTrip);

    //Shape routes
    apiRoutes.use('/shapes',shapeRoutes);
    shapeRoutes.get('/:shape_id', ShapesController.getShapesById);
    shapeRoutes.get('/:lat/:lng', ShapesController.getShapesByLocation);

    //Review routes
    apiRoutes.use('/review', reviewRoutes);
    reviewRoutes.post('/add', ReviewController.createReview);

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