//console.log("hello world")
const express = require('express')
const app = express()
const port = 8000

//ejs
app.set('view engine', 'ejs');// sets view engin to ejs
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))



//mongodb variabelen
require("dotenv").config(); //Het inladen van .env mogelijkheden
const { MongoClient } = require('mongodb')

const db = client.db(process.env.cluster0)
const collection = db.collection(process.env.sample_emflix)
const uri = process.env.DB_HOST; //connecten van de string aan de server zonder je ww te tonen etc

const client = new MongoClient(uri);


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

//form

app.post('/add',(req, res) => { 
  res.send(`thanks for logging in with:
    name: ${req.body.name}
    e-mail: ${req.body.email}`);
})

app.get('/form', (req, res) => {  
  res.render('pages/form'); // de form laten zien in de browser
});

//om de lijst van films te laten zien?
app.get('/list', (req, res) => {  
  res.render('pages/list'); 
});

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


app.listen(port, () => { //Arrow function als hij aan het luisteren is dan console.logt hij wat hieronder staat.
  console.log(`Example app listening on port ${port}`)
});



//mongodb proberen
const query = { title: "A Corner in Wheat" }; //een query met een titel erin waarvan je vermoedelijk de gegevens op wilt halen

const options = {
  // Sort matched documents in descending order by rating
  sort: { "imdb.rating": -1 },
  // Include only the `title` and `imdb` fields in the returned document
  projection: { _id: 0, title: 1, imdb: 1 },
};

async function listOneMovie(req, res) {
  const movie = await movie.findOne().toArray(); 
  res.render('list.ejs', {data:data})
}

console.log(movie); 