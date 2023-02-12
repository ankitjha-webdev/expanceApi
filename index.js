const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const app = express();
require("dotenv").config();
const port = process.env || 3000 ;

// var corsOptions = {
//   origin: "http://localhost:4200",
// };

// app.use(cors(corsOptions));
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true,
  })
);
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.get("/", (req, res) =>
  res.status(200).json({ message: "You are on the home route!" })
);

app.use("/api/users", require("./routes/user.routes.js"));
app.use("/api/expenses", require("./routes/expense.routes.js"));
app.use("/api/auth", require("./routes/auth.routes.js"));

// no route found
app.use((req, res) => {
  res.status(404).json({ message: "Route not found!" });
});



app.listen(port, () =>
  console.log(`Expenditure app listening on port ${port}!`)
);
