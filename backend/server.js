/*créer un serveur Node*/
const http = require('http'); //package HTTP natif de Node
const app = require('./app');

//normalizePort : renvoie un port valide
const normalizePort = val => { 
  const port = parseInt(val, 10);
  if (isNaN(port)) {return val;}
  if (port >= 0) {return port;}
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
//app.set('port', port);

//errorHandler : recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur 
const errorHandler = error => { 
  if (error.syscall !== 'listen') {throw error;}
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur Groupomania." });
});


const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Ecoute sur le ' + bind);
});

/*création des dossiers images*/
const mkdirp = require('mkdirp');
mkdirp('./images').then(made =>
console.log(`création du dossier images`));

server.listen(port); //ce démarre avec 'node server' ou 'nodemon server' 