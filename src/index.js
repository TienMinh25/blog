const path = require('path');
const express = require('express'); // cu phap import cua ES5
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));
// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('hbs', engine({ // config for handlebars
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => 
    {
        res.render('home');
    }

); // dinh nghia route

app.get('/news', (req, res) => 
    {
        res.render('news');
    }

); 

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 