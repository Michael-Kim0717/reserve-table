// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Store (DATA)
// =============================================================
var reservation = [
// define all fields required
	{
		name: "test1",
		number: "123",
		email: "123@a.a",
		id: 1
	},
	{
		name: "test2",
		number: "123",
		email: "123@a.a",
		id: 2
	},
	{
		name: "test3",
		number: "123",
		email: "123@a.a",
		id: 3
	}

];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  	res.sendFile(path.join(__dirname, "../public/home.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/tables.html"));
});

// Displays all characters
app.get("/api/tables", function(req, res) {
  return res.json(reservation);
});

// Displays a single character, or returns false
app.get("/api/tables/:id", function(req, res) {
  var chosen = req.params.id;

  console.log(chosen);

  for (var i = 0; i < reservation.length; i++) {
    if (chosen === reservation[i].id.toString()) {
      return res.json(reservation[i]);
    }
  }

  return res.json(false);
});

// POST routes
app.post("/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservation.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
