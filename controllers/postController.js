const connection = require("../data/db");
const postsData = require("../data/postsData");

// Index
function index(req, res) {
  const sql = `SELECT * FROM posts`;
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// Show
function show(req, res) {
  const id = req.params.id;
  const sql = `
      SELECT posts.title , tags.label 
      FROM tags 
      JOIN post_tag ON tags.id = post_tag.tag_id
      JOIN posts ON post_tag.post_id = posts.id 
      WHERE posts.id = ?
      `;
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (results.length === 0)
      return res.status(404).json({ error: "Pizza not found" });
    res.json(results[0]);
  });
}

// Store
const store = (req, res) => {
  console.log(req.body);
  const newId = postsData[postsData.length - 1].id + 1;
  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  postsData.push(newPost);

  res.status(201).json(newPost);
};

// Update
const update = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);
  if (!post) {
    res.status(404);

    return res.json({
      error: "Post not found",
    });
  }

  post.title = req.body.title;
  post.content = req.body.content;
  post.image = req.body.image;
  post.tags = req.body.tags;

  res.json(post);
};

// Modify
const modify = (req, res) => {
  const post = postsData.find((elm) => elm.id == req.params.id);
  if (!post) {
    res.status(404);

    return res.json({
      error: "Post not found",
    });
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.image = req.body.image || post.image;
  post.tags = req.body.tags || post.tags;

  res.json(post);
};

// Delete
function destroy(req, res) {
  const { id } = req.params;

  connection.query("DELETE FROM posts WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete posts" });
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, modify, destroy };
