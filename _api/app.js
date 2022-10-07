const express = require("express");
const bodyParser = require("body-parser");
const db = require("./models");
const Role = db.role;
const cors = require("cors");

db.sequelize.sync();
const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (request, response) => {
  response.json({
    info: "Node.js, Express, and Postgres API",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}
