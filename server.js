const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const app = express();
const fiveMTradeCron = require('./scheduledFunctions/fiveMTradeCron');
const colorTradeCron = require('./scheduledFunctions/colorTradeCron');
const flightTradeCron = require('./scheduledFunctions/flightTradeCron');
const Socket = require('./zSockets/Socket');
const bodyParser = require('body-parser');
//Socket.io
const http = require('http').Server(app);
const cors = require('cors');
const socketIO = require('socket.io')(http, {
  cors: {
    origin: ['http://localhost:3000', 'https://zicogames.onrender.com/'],
  },
});
app.use(cors());
//calling socket
Socket.init(socketIO);
// Connect Database
connectDB();
//Cron Jobs
fiveMTradeCron.init();
colorTradeCron.init();
flightTradeCron.init();
// Init Middleware
app.use(express.json({ extended: false }));
// Defining body-parser
app.use(bodyParser.urlencoded({ extended: true }));
// Defining pictures folder static
app.use(express.static('uploads'));
//attaching socket
app.use(function (req, res, next) {
  req.io = socketIO;
  next();
});
// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/five-m-trade', require('./routes/api/fiveMTrade'));
app.use('/api/color-trade', require('./routes/api/colorTrade'));
app.use('/api/flight-trade', require('./routes/api/flightTrade'));
app.use('/api/user-trade', require('./routes/api/userTradeData'));
app.use('/api/wallet', require('./routes/api/wallet'));
app.use('/api/top-up-request', require('./routes/api/topUpRequest'));
app.use('/api/withdrawl-request', require('./routes/api/withdrawlRequest'));
app.use('/api/wc-games', require('./routes/api/wcGames'));
app.use('/api/pg', require('./routes/api/pg'));

// Set static folder
app.use(express.static('client/build'));
// Routing all requestes to the client build
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
// Define Port
const PORT = process.env.PORT || 8081;
// Server Start
http.listen(PORT, () => console.log(`Server started on port ${PORT}`));
