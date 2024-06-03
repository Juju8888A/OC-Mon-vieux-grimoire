const express = require("express");
const mongoose = require("mongoose");
const booksRoutes = require("./routes/routes_books");
const usersRoutes = require("./routes/routes_users");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://jourdanjuliette:5wj9PM8raElQTT0I@clustermonvieuxgrimoire.sssnb3r.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMonVieuxGrimoire",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/books", booksRoutes);
app.use("/api/auth", usersRoutes);

module.exports = app;
