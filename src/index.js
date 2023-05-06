const path = require('path');
const express = require('express'); // cu phap import cua ES5
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

const route = require('./routes/index.js');


app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ // config for handlebars
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// Routes init
route(app);

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 
// thang query parameter se cham query (cua method get)
// thang form data se cham body ( cua method post )