const db = require("../db/index");
const Document = db.documents;

exports.create = (req, res) => {
   if (!req.body.nombre || !req.body.lines) {
    res.status(400).send({ message: "Check the required params [nombre, lines]" });
    return;
  }

  const document = new Document({
    nombre: req.body.nombre,
    lines: req.body.lines
  });

  document
    .save(document)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo falló"
      });
    });
};

exports.findAll = (req, res) => {
    console.log("findall");
  
    Document.find({})
      .then(data => {
        console.log("data");
        res.send(data);
      })
      .catch(err => {
        console.log("findall");
        res.status(500).send({
          message:
            err.message || "Algo falló"
        });
      });
};

exports.findOne = (req, res) => {
    let id = req.params.id;
    Document.findById(id)
      .then(data => {
        if (!data){
          res.status(404).send({ message: "No encontramos el documento con el id " + id });
        }else {
          res.send(data);
        }
      })
      .catch(err => {
        console.log("error");
        res.status(500).send({ message: "Algo falló" });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Body vacio."
        });
    }
    
    const id = req.params.id;
    
    Document.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: 'Parece que no existe ese documento'
            });
          } else res.send({ message: "Actualizacion ok" });
        })
        .catch(err => {
          res.status(500).send({
            message: "Fallo la actualizacion . Id : " + id
          });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Document.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
        message: 'Parece que no existe ese documento'
        });
      } else {
        res.send({
          message: "Documento eliminado"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No pudimos eliminar ese documento"
      });
    });
};

exports.deleteAll = (req, res) => {
    Documento.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Documentos fueron borrados`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algo falló"
      });
    });
};