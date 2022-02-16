const express = require('express'), //express framework
      morgan = require('morgan'),   //morgan framework
      app = express(),      //express framework beeing used
      bodyParser = require('body-parser'),
      methodOverride = require('method-override');

      // all 5 const are being written one after another and seprated by a colon to avoid re-writting "const" 3 times

let topMovies = [         //list of favorite movies
  {
    title: 'Saving Private Ryan',
    director: 'Steven Spielberg'
  },
  {
    title: 'Goodfellas',
    director: 'Martin Scorsese'
  },
  {
    title: 'Forest Gump',
    director: 'Robert Zemeckis'
  },
  {
    title: 'Pulp Fiction',
    director: 'Quentin Tarantino'
  },
  {
    title: 'Band of Brothers',
    director: 'Steven Spielberg'
  },
  {
    title: 'Once Upon a Time in America',
    director: 'Sergio Leone'
  },
  {
    title: 'Shutter Island',
    director: 'Martin Scorsese'
  },
  {
    title: 'Catch Me if You Can',
    director: 'Steven Spielberg'
  },
  {
    title: 'Escape from Pretoria',
    director: 'Francis Annan'
  },
  {
    title: 'Home Alone',
    director: 'Chris Columbus'
  },
];

app.use(morgan('common'));  //morgan function "use"

app.get('/', (req, res) => {
  res.send('Welcome to my favorite movies list!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use(express.static('public'));    //static file given access via express static

app.get('/movies', (req, res) => {
  res.json(topMovies);      //topMovies array served
});

// Error Handling in Express/Middleware. This code comes after all "app.use" and route calls ("app.get", "app.post") BUT before "app.listen"

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('WTF?!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');   //console.log to ensure connectivity and app is running via terminal
});
