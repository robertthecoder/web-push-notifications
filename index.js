// Public Key:
// BAObjTkkWWTcmfIzGqGNEqs6smGKTchrfki1_QF_BlIqsJXDY4A3sb6rPxfNSw68pf1NH8NPZzvVG2KZMiZvLO8

// Private Key:
// 6FNxZREwIUjEWA_PLkkent8g9Esvhz3iWPrItBp3h0c

const webpush = require("web-push");
var express = require("express");
const path = require("path");

// TODO: Eventually, put vapid key in process.env.keys:
const publicVapidKey =
  "BAObjTkkWWTcmfIzGqGNEqs6smGKTchrfki1_QF_BlIqsJXDY4A3sb6rPxfNSw68pf1NH8NPZzvVG2KZMiZvLO8";
const privateVapidKey = "6FNxZREwIUjEWA_PLkkent8g9Esvhz3iWPrItBp3h0c";

// Replace with your email
webpush.setVapidDetails(
  "mailto:robert.kim@mits.com",
  publicVapidKey,
  privateVapidKey
);

const app = express();
const port = 3000;

app.use(require("body-parser").json());

// app.use(express.json()); // to support JSON-encoded bodies
// app.use(express.urlencoded());

// app.get("/", (req, res) => res.send("Hello World!"));
app.get("/", (req, res) => res.sendFile(path.join(__dirname + "/index.html")));

app.post("/subscribe", (req, res) => {
  const subscription = req.body;
  // res.status(201).json({});
  const payload = JSON.stringify({ title: "test" });

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });

  res.json(subscription);
});

//  in order to serve up your static assets to the client, use the express-static npm module to configure your Express app to serve static files from the top-level directory. Just make sure you put this app.use() call after your /subscribe route handler, otherwise Express will look for a subscribe.html file instead of using your route handler.
app.use(require("express-static")("./"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
