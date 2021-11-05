const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
/*
db.sequelize.sync({ force: false }).then(() => {
  console.log("Synchronise la base de donnée.");
});
*/


app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur Groupomania." });
});

//require("./routes/posts")(app);
//require("./routes/user")(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`le serveur est démarré sur le port ${PORT}.`);
});