const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
bodyParser = require("body-parser");
const shortId = require("shortid");
const db = require("./db");

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const text = "SELECT * FROM test.links";
  const data = await db.query(text);
  res.render("../pages/index", {
    data: data,
  });
});

app.post("/shortUrls", async (req, res) => {
  const fullUrl = await req.body.fullUrl;
  const text =
    "INSERT INTO test.links(long_url, short_url) VALUES($1, $2) RETURNING *";
  const generatedId = shortId.generate();
  const values = [fullUrl, generatedId];
  db.query(text, values);

  res.redirect("/");
});

app.get("/favicon.ico", async (req, res) => {
  return;
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrl = [req.params.shortUrl];
  const text = "SELECT long_url FROM test.links WHERE short_url=$1";
  const result = await db.query(text, shortUrl);
  const fullUrl = result.rows[0].long_url;
  res.redirect(fullUrl);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
