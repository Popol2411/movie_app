const express = require('express'), //express framework
      app = express(),      //express framework beeing used
      bodyParser = require('body-parser'),
      uuid = require('uuid');

      // all const are being written one after another and seprated by a colon to avoid re-writting "const" multiple times

app.use(bodyParser.json());

let users = [ //list of users
{
id: 1,
Name: "Jean-Paul",
favoriteMovies: ["Goodfellas", "The Birds", "Jurassic World"]
},
{
id: 2,
Name: "David",
favoriteMovies: ["E.T.", "Men in Black"]
},
{
id: 3,
Name: "Sarah",
favoriteMovies: ["Titanic", "Lord of the Rings", "Black Hawk Down"]
}
];

let movies = [         //list of favorite movies
  {
    Title: "Saving Private Ryan",
    Genre: {
    Name: "War",
  },
    Director: {
    Name: "Steven Spielberg",
    Born: "1946"
  }},

  {
    Title: "Goodfellas",
    Genre: {
    Name: "Crime"
  },
    Director: {
    Name: "Martin Scorsese",
    Born: "1942"
  }},

  {
    Title: "Forrest Gump",
    Genre: {
    Name: "War"
  },
    Director: {
    Name: "Robert Zemeckis",
    Born: "1951"
  }},

  {
    Title: "Pulp Fiction",
    Genre: {
    Name: "Action"
  },
    Director: {
    Name: "Quentin Tarantino",
    Born: "1963"
  }},

  {
    Title: "Band of Brothers",
    Genre: {
    Name: "History"
  },
    Director: {
    Name: "Steven Spielberg",
    Born: "1946"
  }},

  {
    Title: "Once Upon A Time In America",
    Genre: {
    Name: "Crime"
  },
    Director: {
    Name: "Sergio Leone",
    Born: "1929"
  }},

  {
    Title: "Shutter Island",
    Genre: {
    Name: "Thriller"
  },
    Director: {
    Name: "Martin Scorsese",
    Born: "1942"
  }},

  {
    Title: "Catch Me If You Can",
    Genre: {
    Name: "Comedy"
  },
    Director: {
    Name: "Steven Spielberg",
    Born: "1946"
  }},

  {
    Title: "Escape from Pretoria",
    Genre: {
    Name: "History"
  },
    Director: {
    Name: "Francis Annan",
    Born: "1984"
  }},

  {
    Title: "Home Alone",
    Genre: {
    Name: "Comedy"
  },
    Director: {
    Name: "Chris Columbus",
    Born: "1958"
  }}
];

//CREATE User

app.post('/users', (req, res) => {
  const newUser = req.body;

  if (newUser.name) {
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).json(newUser)
  } else {
    res.status(400).send("User needs name")
  }
})

//READ User List

app.get('/users', (req, res) => {
  res.status(200).json(users);
})

//READ User // ID

app.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const userID = users.find( userID => userID.id == id );
  res.status(200).json(userID);
})

//READ Movie List

app.get('/movies', (req, res) => { //req = request, res = response
  res.status(200).json(movies); //status 200 when information is returned
})

//READ Movie Title

app.get('/movies/:title', (req, res) => { //link to the information
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title );

  if (movie) {
    res.status(200).json(movie);
  } else {
    res.status(400).send("No such movie")
  }
})

//READ Movie Genre

app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = movies.find( movie => movie.Genre.Name === genreName ).Genre; //only the genre will be returned

  if (genre) {
    res.status(200).json(genre);
  } else {
    res.status(400).send("No such genre")
  }
})

//READ Movie Director

app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = movies.find( movie => movie.Director.Name === directorName ).Director; //only the Director information will be returned

  if (director) {
    res.status(200).json(director);
  } else {
    res.status(400).send("No such director")
  }
})

//READ Main Page

app.get('/', (req, res) => {
  res.send('Welcome to my favorite movies list!');
});

//READ Documentation

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.use(express.static('public'));    //static file given access via express static

//UPDATE User Name

app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = users.find( user => user.id == id ); //truthy condition/boolean

  if (user) {
    user.Name = updatedUser.Name;
    res.status(200).json(user);
  } else {
    res.status(400).send("No such user")
  }
})

//UPDATE User Favorite Movies

app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id ); //truthy condition/boolean

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}´s array`);
  } else {
    res.status(400).send("No such user")
  }
})

//DELETE User Favorite Movies

app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;

  let user = users.find( user => user.id == id ); //truthy condition/boolean

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter( title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}´s array`);
  } else {
    res.status(400).send("No such user")
  }
})

//DELETE User

app.delete('/users/:id/', (req, res) => {
  const { id } = req.params;

  let user = users.find( user => user.id == id ); //truthy condition/boolean

  if (user) {
    users = users.filter( user => user.id != id);
    res.status(200).send(`User ${id} has been deleted`);
  } else {
    res.status(400).send("No such user")
  }
})

//Error Handling in Express/Middleware. This code comes after all "app.use" and route calls ("app.get", "app.post") BUT before "app.listen"

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('WTF?!');
});

// listen for requests
app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');   //console.log to ensure connectivity and app is running via terminal
});
