module.exports = app => {
    const documents = require("../controllers/documents");
  
    var router = require("express").Router();

    router.post("/", documents.create);
    router.get("/", documents.findAll);
    router.get("/:id", documents.findOne);
    router.put("/:id", documents.update);
    router.delete("/:id", documents.delete);
    router.delete("/", documents.deleteAll);
  
    app.use('/api/documents', router);
  };