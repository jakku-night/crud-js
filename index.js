const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const morgan = require('morgan');
const SocketIO = require('socket.io');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const webpack_config = require('./webpack.config');
const path = require('path');
const tester = require('./routes/index');
const test = require('./routes/api/test');

const app = express();

// Setup:

app.use(express.static(path.join(__dirname, 'public')));
app.set('port', process.env.PORT || 3000);
const corsOptions = {
    origin: '*'
};

// Webpack:

app.use(WebpackDevMiddleware(webpack(webpack_config)));

// Middlewares:

app.use(cors(corsOptions));
app.use(fileupload());
app.use(morgan('dev'));
app.use((req, res, next) => {
    console.log(req.protocol.toUpperCase(), req.method.toUpperCase(), req.url);
    next();
});

// Routes:

app.use(tester);
app.use(test);

// Startup:

const Server = app.listen(app.get('port'), () => {
    console.log('Server on port:', app.get('port'));
});

// Socket.IO:

const io = SocketIO(Server);

io.on('connection', (socket) => {
    console.log('New Connection:', socket.id);
});