const path = require('path');
const express = require('express'); // cu phap import cua ES5
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

app.get('/', (req, res) => 
    {
        res.render('home');
    }

); // dinh nghia route

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
 