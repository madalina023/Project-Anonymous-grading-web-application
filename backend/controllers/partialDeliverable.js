const StudentDb = require("../models").Student;
const TeacherDb = require("../models").Teacher;
const ProjectDb = require("../models").Project;
const PartialDeliverableDb = require("../models").PartialDeliverable;
const GradeDb = require("../models").Grade;

const controller = {
  getAllPartialDeliverables: async (req, res) => {
    PartialDeliverableDb.findAll()
      .then((partialDeliverables) => {
        res.status(200).send(partialDeliverables);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addPartialDeliverable: async (req, res) => {
    const { nume, link, projectId } = req.body;
    ProjectDb.findByPk(projectId)
      .then((project) => {
        if (project) {
          if (nume) {
            if (link) {
              project
                .createPartialDeliverable({ nume, link })
                .then((partialDeliverable) => {
                  res.status(201).send(partialDeliverable);
                })
                .catch((error) => {
                  console.log(error);
                  res.status(500).send({ message: "Server error!" });
                });
            } else {
              res.status(400).send({ message: "No link entered!" });
            }
          } else {
            res.status(400).send({ message: "No name entered!" });
          }
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getPartialDeliverableById: async (req, res) => {
    PartialDeliverableDb.findByPk(req.params.id)
      .then((partialDeliverable) => {
        if (partialDeliverable) {
          res.status(201).send(partialDeliverable);
        } else {
          res.status(404).send({ message: "Partial Deliverable not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updatePartialDeliverableById: async (req, res) => {
    PartialDeliverableDb.findByPk(req.params.id)
      .then((partialDeliverable) => {
        if (partialDeliverable) {
          if (req.body.nume) {
            if (req.body.link) {
              partialDeliverable.update(req.body);
              res.status(202).send(partialDeliverable);
            } else {
              res.status(400).send({ message: "No link entered!" });
            }
          } else {
            res.status(400).send({ message: "No name entered!" });
          }
          // ProjectDb.findByPk(req.body.projectId).then((project) => {
          //   if (project) {

          //   } else {
          //     res.status(404).send({ message: "Project not found!" });
          //   }
          // });
        } else {
          res.status(404).send({ message: "Partial Deliverable not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  deletePartialDeliverableById: async (req, res) => {
    PartialDeliverableDb.findByPk(req.params.id)
      .then((partialDeliverable) => {
        if (partialDeliverable) {
          partialDeliverable.destroy();
          res.status(202).send({ message: "deleted" });
        } else {
          res.status(404).send({ message: "Partial Deliverable not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
