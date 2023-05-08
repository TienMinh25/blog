const path = require('path');
const express = require('express'); // cu phap import cua ES5
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

const sortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routes/index.js');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


app.use(methodOverride('_method'));

// Custome middlewares
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine('hbs', 
    engine({ // config for handlebars
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type: 'default'

                const icons = {
                    default: 'oi oi-elevator',
                    asc: 'oi oi-sort-ascending',
                    desc: 'oi oi-sort-descending',
                }
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                };

                const icon = icons[sortType];
                const type = types[sortType];

                return `<a href="?_sort&column=${field}&type=${type}">
                    <span class="${icon}"></span>
                </a>`;
            }
        }
    })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
 
// thang query parameter se cham query (cua method get)
// thang form data se cham body ( cua method post )