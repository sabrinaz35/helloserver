//console.log("hello world")

const express = require('express')
const app = express()
const port = 8000

//ejs
app.set('view engine', 'ejs');// sets view engin to ejs
app.set('vieuws', 'view')

//ROUTES//
//home
//Voor ieder verschillende pagina maak je er een aan. Je kan het zien als een template. Je maakt een soort opmaak en hoeft alleen de content er dan van te veranderen.
app.get('/', (req, res) => { //Arrow function staat hier meteen al achter, als iemand een get request stuurt dan moet er hello world verstuurd worden.
  // res.send('Hello!')//res.send('<h1>hello world!<h1>')

  var mascots = [ // variabele met elementen die uiteindelijk tevoorschijn komen
    { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
    { name: 'Tux', organization: "Linux", birth_year: 1996},
    { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
  ];
  var tagline = "No programming concept is complete without a cute animal mascot.";

  res.render('pages/index', { //word de pagina mee opgehaald
    mascots: mascots,
    tagline: tagline
  }); //renderen pagina's van ejs
})

//inloggen
app.use(express.urlencoded({extended:true}))

app.post('/add',(req, res) => { 
  res.send(`thanks for logging in with:
    name: ${req.body.name}
    e-mail: ${req.body.email}`);
})

app.get('/', (req, res) => { //show de 
  res.render('add.ejs');
})



//About 
app.get('/about', (req, res) => { 
  // res.send('<h1>about</h1>')
  res.render('pages/about');
})

//Profiel
app.get('/profile/:username', (req, res) => { 
  const username = req.params.username
  res.send('<h1>Hallo</h1>' + username); //Je kan dan je eigen naam achter de / zetten en dan vershcijnt jouw naam in het scherm
})

//Not found
app.use((req, res) => { 
  res.status(404).send('<h1>404 not found</h1>');
})  

//Static
app.use('/static',express.static('static'));

app.listen(port, () => { //Arrow function als hij aan het luisteren is dan console.logt hij wat hieronder staat.
  console.log(`Example app listening on port ${port}`)
});