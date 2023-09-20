require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');

const app = express();
const PORT = 5000 || process.env.PORT;

app.use(express.static('public')); // set public folder for public assets

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs'); // change the view engine to ejs (template engine)

app.use('/', require('./server/routes/main'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
