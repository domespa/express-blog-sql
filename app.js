const express = require("express");
const app = express();
const cors = require("cors");
const port = 3005;
const postsRouter = require("./routers/postsRouter.js");
const errorsHandler = require("./middleware/errorsHandler.js");
const notFound = require("./middleware/notFound.js");

// Middleware global
app.use(express.static("public"));
app.use(express.json());

// Middleware cors
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.get("/", (req, res) => {
  res.send("Server del mio Blog");
});

app.get("/bacheca", (req, res) => {
  res.json(posts);
});

app.use("/posts", postsRouter);

// Middleware errori
app.use(errorsHandler);
app.use(notFound);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
