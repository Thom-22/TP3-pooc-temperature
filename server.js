const express = require('express')
const app = express()
const port = 3000

//OS est un utilitaire node qui va nous servir à afficher le nom de notre raspberry
const os = require("os");
//MustacheExpress est notre moteur de template
const mustacheExpress = require('mustache-express');

//Configuration du moteur de template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

//Ici on dit au serveur de servir les fichiers statiques depuis le dossier /public
app.use(express.static('public'))

//On retrouve le même comportement que notre serveur précédent
app.get('/', (request, response) => { 
//Ici on indique que nous voulons transformer notre fichier index.mustache en HTML
  response.render('index');})

app.get('/hello', (request, response) => {//De la même manière nous transformons notre fichier hello.mustache en HTML en passant des paramètres.
temperature = sensor.temperatureSync(sensorId);  
response.render('hello', {name: temperature, mes: message });})

app.listen(port, (err) => {
  if (err) {
    return console.log('Erreur du serveur : ', err)
  }


 //On utilise l'utilitaire OS pour récupérer le nom de notre raspberry.
  console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);})

//On initialise notre utilitaire node pour communiquer avec le capteur 
//(capteur = sensor en anglais)
const sensor = require('ds18b20');
//Identifiant de notre capteur, remplacez les X par ce que vous avez eu précédemment.
const sensorId = '28-01131a3de1fd';
//On lit la température en provenance du capteur.
var temperature = sensor.temperatureSync(sensorId);
var message ;
//On affiche dans le terminal la température.
console.log('La température est de ' + temperature);

if (temperature < 15) {
    message = 'Il fait froid watchayy ';
  } else if ( 15 < temperature && temperature < 30) {
    message = 'ça peut aller !';
  } else { 
    message = 'Il fait chaud cacao !';
  };
