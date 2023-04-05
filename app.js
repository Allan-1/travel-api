const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const hotelrouter = require('./routes/cities');
const authrouter = require('./routes/auth');
const bookingrouter = require('./routes/bookings');

// port
const port = process.env.PORT || 3000;

// initialize express
const app = express();

// uses bodyParser to parse JSON responses
app.use(bodyParser.json());

// routes
app.use(hotelrouter);
app.use(authrouter);
app.use(bookingrouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
