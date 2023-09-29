require('dotenv').config()
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const express = require('express');
const userRoute = require('./Routers/UserRoute/userRoute');
const port = process.env.PORT;
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({origin:process.env.CLIENT_URL}));

// Database Connect 
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_SERVER, { useNewUrlParser: true })
  .catch(e => {
    console.error('Connection error', e.message);
  });
const db = mongoose.connection;

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());


app.use('/api', userRoute);

server.listen(port, function () {
    console.log('Server running on port ' + port);
  });
   