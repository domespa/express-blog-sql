// Create un file di routing (routers/posts.js) che conterrà le rotte necessario per l'entità post.
// All'interno creare le rotte per le operazioni CRUD (Index, Show, Create, Update e Delete)

const express = require('express')
const postController = require("../controllers/postController")
const router = express.Router()
const validationParamId = require("../middleware/validationParamId");

//router.param("/:id", validationParamId),//

// Index 
router.get("/", postController.index);

// Show
router.get("/:id", validationParamId, postController.show);

// Store
router.post("/", postController.store);

// Update 
router.put("/:id", validationParamId,  postController.update);

// Modify
router.patch("/:id", validationParamId, postController.modify);

// Delete
router.delete("/:id", validationParamId, postController.destroy);

module.exports = router