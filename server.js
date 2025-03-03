//console.log("hello world")
const express = require('express')
const app = express()
const port = 8000

//ejs
app.set('view engine', 'ejs');// sets view engin to ejs
app.set('views', 'views')

app.use(express.urlencoded({extended: true}))
app.use(express.static('static'))



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

// app.post('/add',(req, res) => { 
//   res.send(`thanks for logging in with:
//     name: ${req.body.name}
//     e-mail: ${req.body.email}`);
// })

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



app.listen(port, () => { //Arrow function als hij aan het luisteren is dan console.logt hij wat hieronder staat.
  console.log(`Example app listening on port ${port}`)
});


//Mogo db connect juist check//
//mongodb variabelen
require("dotenv").config(); //Het inladen van .env mogelijkheden
const { MongoClient } = require('mongodb')

const uri = process.env.DB_HOST; //connecten van de string aan de server zonder je ww te tonen etc

const client = new MongoClient(uri);

// Connecten + controleren of mongo goed is geconnect
async function connectDB() {
  try {
    await client.connect(); // ✅ Eerst verbinden met de database
    console.log("✅ Verbonden met MongoDB!");

    const db = client.db(process.env.DB_NAME); // ✅ Haal database naam correct uit .env
    const collection = db.collection(process.env.COLLECTION); // ✅ Haal collectie naam correct uit .env

    return { db, collection }; // ✅ Geef de database en collectie terug
  } catch (error) {
    console.error("❌ Fout bij verbinden met MongoDB:", error);
  }
}

connectDB(); // ✅ Roep de connectie aan


//******************/
//  mongodb + form  //
//******************/
  

app.post('/add',async (req, res) => { 

  try {
    const db = client.db("sample_mflix");
    const collection = db.collection("users");
  
    await client.connect();
  
      // Door de query aan te passen kan je verschillende gegevens opvragen
        const query = { name: req.body.name }; 
    
        const options = {
          // Sort matched documents in descending order by rating
          // Include only the `title` and `imdb` fields in the returned document
          projection: { _id: 0, name: 1, email: 1 },
        };
  
    const user = await collection.findOne(query, options);
  
    if (user) {
      res.send(`Welkom, ${user.name}! Inloggen was succesvol.`);
  } else {
      res.status(404).send("Gebruiker niet gevonden. Probeer opnieuw.");
  }
  
  } catch (error) {
    console.error("Fout bij het controleren van de gebruiker:", error);
    res.status(500).send("Er is een fout opgetreden.");
  } 
  finally {
    await client.close();
  }
  
  })
  
  app.get('/form', (req, res) => {  
    res.render('form'); // de form laten zien in de browser
  });



// ERORR HANDLING//
app.use((req, res) => { 
  res.status(404).send('<h1>404 not found</h1>');
})  

// // mongodb proberen
// //Variabele om uiteindelijk een film eruit te krijgen  


//********** De code is als comment gedaan, omdat niet alles tegelijk kan draaien dan geeft hij foutcode  ************/

// //Een funtie om de fillms uit de database te halen een enkele maar ook meerdere
// async function listOneMovie(req, res) {
//   try {
//     const db = client.db("sample_mflix");
//     const collection = db.collection("movies");

//     //Door de query aan te passen kan je verschillende gegevens opvragen
//     // const query = { title: "The Room" }; 
//     const query = { runtime: { $lt: 15 }  }; //runtime minder dan 15 minuten


//     const options = {
//       // Sort matched documents in descending order by rating
//       sort: { "imdb.rating": 1 },
//       // Include only the `title` and `imdb` fields in the returned document
//       projection: { _id: 0, title: 1, imdb: 1 },
//     };
 

//     // const movie = await collection.find(query, options).toArray(); //Geeft hij een hele lijst weer die voldoen aan de query en de options 
//     const movie = await collection.findOne(query, options); //met deze methode geeft hij er maar eentje weer

//     console.log(movie); //Logt de data in de console van de aangegeven film


//   } catch (error) {
//     console.error("❌ Fout bij ophalen van film:", error);
//   }

// }

// listOneMovie();



//Functie om een toe te voegen aan de database 
// async function addNew (req, es) {
//   try {
//     const database = client.db("Oefenen"); //Je maakt een database aan in je mongo die je dan een naam geeft tussen ""
//     const haiku = database.collection("mijnFavoFilms") //In die colletion voeg je een map toe met daarin een collection map met de naam haiku

//     const doc = { //Een document aanmaken om toe te voegen aan de database haiku
//       title: "The amazing spiderman",
//       content: "A movie about spiderman, to learn inserting documents"
//     }

//     const result = await haiku.insertOne(doc)

//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
//   } finally {
//     // Close the MongoDB client connection
//     await client.close();
//  }
// } 

// addNew(); Even als comment anders gaat hij steeds opnieuw een toevoegen als ik refresh haha
//Om meerdere documenten toe te voegen doe je eigenlijk hetzelfde als de functie addNew, maar dan maak je van de const doc een array en pas je insertOne aan naar insertMany()

    //*******/ Hieronder het voorbeeld van de doc etc./*******/
    // const docs = [
    //   { name: "cake", healthy: false },
    //   { name: "lettuce", healthy: true },
    //   { name: "donut", healthy: false }
    // ];
    // // Prevent additional documents from being inserted if one fails
    // const options = { ordered: true };

    // const result = await foods.insertMany(docs, options);
   

//Update a document

// async function updateMovie(req, res){
//   try {
//     //Eerst de variabele aanmaken om de database op te zoeken en te definieren
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");

//     //Een filter creeeren met daarin op wat je het wilt filteren 
//     const filter = { title: "Random Harvest" };

//       /* Set the upsert option to insert a document if no documents match
//     the filter */
//     const options = { upsert: true };

//     //specify wat je wilt aanpassen in het document
//     const updateDoc = {
//       $set: {
//         plot: `A harvest of random numbers, such as: ${Math.random()}` 
//       },
//     };

//     //Hiermee update hij de eerste film die aan de filter voldoet
//     const result = await movies.updateOne(filter, updateDoc, options);

//     //console log om te kijken natuurlijk
//     console.log(
//       `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
//     );
//   } finally {
//     await client.close();
//   }
// }

// updateMovie();

//Ook bij deze kan je meerdere tergelijketrtijd updaten hieronder het voorbeeld hoe dat dan moet

// // Create a filter to update all movies with a 'G' rating
// const filter = { rated: "G" };
// // Create an update document specifying the change to make
// const updateDoc = {
//   $set: {
//     random_review: `After viewing I am ${
//       100 * Math.random()
//     }% more satisfied with life.`,
//   },
// };
// // Update the documents that match the specified filter
// const result = await movies.updateMany(filter, updateDoc);
// console.log(`Updated ${result.modifiedCount} documents`);

//verandering/aanpassing in een document maken
// async function changeIt(req,res){
//   try{
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");

//     //Huidige document ophalen met een titel met daarin the cat from
//     const query = { title: { $regex: "The Cat from" } };

//     //Het document wat het hiervoor genoemde vervangen moet 
//     const replacement = {
//       title: `The Cat from Sector ${Math.floor(Math.random() * 1000) + 1}`,
//     };

//     //Het daadwerkelijk uitvoeren van de verandering
//     const result = await movies.replaceOne(query, replacement);

//     //het printen van resultaat
//     console.log(`Modified ${result.modifiedCount} document(s)`);

//   } finally {
//     await client.close();
//   }
// }

// changeIt(); 
//deze code geeft een gekke foutmelding hierboven


//Delete van een document 

// async function deleteDocument(req, res) {
//   try {
//     const database = client.db("sample_mflix");
//     const movies = database.collection("movies");

//     // Om de eerste document te verwijderen in de collectie movies dat overeenkomt met de queery
//     const query = { title: "Annie Hall" };
//     const result = await movies.deleteOne(query);

//   // natuurlijk checken of dat lukt met de consol.log
//     if (result.deletedCount === 1) {
//       console.log("Successfully deleted one document.");
//     } else {
//       console.log("No documents matched the query. Deleted 0 documents.");
//     }
//   } finally {
//     await client.close();
//   }
// }

// deleteDocument();
