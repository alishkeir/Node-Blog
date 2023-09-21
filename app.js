require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const connectDB = require('./server/config/db');

const app = express();
const PORT = 5000 || process.env.PORT;

// connect to db
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public')); // set public folder for public assets

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); // change the view engine to ejs (template engine)

app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
