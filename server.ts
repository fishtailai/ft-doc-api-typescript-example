import express from "express";
import bodyParser from "body-parser";

const app = express();
const jsonParser = bodyParser.json();

const PORT = process.env.PORT || 5000;

// I use tunnelto.dev to expose my local server to nte internet
// for me, https://mheld.tunnelto.dev/incoming-webhook is the URL
// `tunnelto --subdomain mheld --port 5000` creates a tunnel to my local server
// feel free to use your own server/tunnel service here

app.post("/incoming-webhook", jsonParser, (req, res) => {
  console.log(req.body); // => { event: "documents.digitized", ... }
  res.send("ok");
});

app.listen(PORT, () =>
  console.log(`⚡Server is running here 👉 https://localhost:${PORT}`)
);
