const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;
//define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//setup handlerbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//set static directory
app.use(express.static(publicDirectoryPath));
//it uses the files from public folder
//static in the above statement means that the file is always static

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Ashutosh",
    footer: "Made by Ashu & co",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Robo",
    footer: "Made by Ashu & co",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Page",
    exampleText: "This is an example text",
    footer: "Made by Ashu & co",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide the search term" });
  }
  res.send({ products: [] });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "You must provide the address" });
  } else
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
      if (error) return res.send({ error });
      else {
        forecast(latitude, longitude, (error, weather) => {
          if (error) return res.send({ error });
          else return res.send({ weather, place });
        });
      }
    });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    errorMessage: "Help article not found",
    footer: "Made by Ashu & co",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404 Error Page",
    errorMessage: "Page not found",
    footer: "Made by Ashu & co",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
