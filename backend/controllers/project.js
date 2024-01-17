const StudentDb = require("../models").Student;
const TeacherDb = require("../models").Teacher;
const ProjectDb = require("../models").Project;
const PartialDeliverableDb = require("../models").PartialDeliverable;
const GradeDb = require("../models").Grade;

const controller = {
  getAllProjects: async (req, res) => {
    ProjectDb.findAll()
      .then((projects) => {
        res.status(200).send(projects);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addProject: async (req, res) => {
    const { titlu, studentId } = req.body;
    StudentDb.findByPk(studentId)
      .then((student) => {
        if (student) {
          if (titlu) {
            student
              .createProject({ titlu })
              .then((project) => {
                res.status(201).send(project);
              })
              .catch((error) => {
                console.log(error);
                res.status(500).send({ message: "Server error!" });
              });
          } else {
            res.status(400).send({ message: "No title entered!" });
          }
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectById: async (req, res) => {
    ProjectDb.findByPk(req.params.id)
      .then((project) => {
        if (project) {
          res.status(201).send(project);
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateProjectById: async (req, res) => {
    ProjectDb.findByPk(req.params.id)
      .then((project) => {
        if (project) {
          StudentDb.findByPk(req.body.studentId).then((student) => {
            if (student) {
              if (req.body.titlu) {
                project.update(req.body);
                res.status(202).send(project);
              } else {
                res.status(400).send({ message: "No title entered!" });
              }
            } else {
              res.status(404).send({ message: "Student not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  deleteProjectById: async (req, res) => {
    ProjectDb.findByPk(req.params.id)
      .then((project) => {
        if (project) {
          project.destroy();
          res.status(202).send({ message: "deleted" });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getPartialDeliverablesFromProject: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided" });
    }

    ProjectDb.findByPk(id, {
      include: [{ model: PartialDeliverableDb, as: "PartialDeliverable" }],
    })
      .then((project) => {
        if (project) {
          res.status(200).send(project);
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getPartialDeliverableByIdFromProject: async (req, res) => {
    const { pid, lid } = req.params;
    if (!pid) {
      res.status(400).send({ message: "Project ID not provided" });
    }
    if (!lid) {
      res.status(400).send({ message: "Partial deliverable ID not provided" });
    }

    ProjectDb.findByPk(pid)
      .then((project) => {
        if (project) {
          PartialDeliverableDb.findOne({
            where: {
              id: lid,
              projectId: pid,
            },
          }).then((partialDeliverable) => {
            if (partialDeliverable) {
              res.status(200).send(partialDeliverable);
            } else {
              res
                .status(404)
                .send({ message: "Partial Deliverable not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addPartialDeliverableToProject: async (req, res) => {
    const { nume, link } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "Project ID not provided" });
    }

    ProjectDb.findByPk(id)
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

  updatePartialDeliverablesToProject: async (req, res) => {
    const { nume, link } = req.body;
    const { pid, lid } = req.params;
    if (!lid) {
      res.status(400).send({ message: "Project ID not provided" });
    }
    if (!lid) {
      res.status(400).send({ message: "Partial Deliverable ID not provided" });
    }

    ProjectDb.findByPk(pid)
      .then((project) => {
        if (project) {
          PartialDeliverableDb.findOne({
            where: {
              id: lid,
              projectId: pid,
            },
          }).then((partialDeliverable) => {
            if (partialDeliverable) {
              if (nume) {
                if (link) {
                  partialDeliverable.update(req.body);
                  res.status(202).send(partialDeliverable);
                } else {
                  res.status(400).send({ message: "No link entered!" });
                }
              } else {
                res.status(400).send({ message: "No name entered!" });
              }
            } else {
              res
                .status(404)
                .send({ message: "Partial Deliverable not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  deletePartialDeliverablesToProject: async (req, res) => {
    const { pid, lid } = req.params;
    if (!lid) {
      res.status(400).send({ message: "Project ID not provided" });
    }
    if (!lid) {
      res.status(400).send({ message: "Partial Deliverable ID not provided" });
    }

    ProjectDb.findByPk(pid)
      .then((project) => {
        if (project) {
          PartialDeliverableDb.findOne({
            where: {
              id: lid,
              projectId: pid,
            },
          }).then((partialDeliverable) => {
            if (partialDeliverable) {
              partialDeliverable.destroy();
              res.status(202).send({ message: "deleted" });
            } else {
              res
                .status(404)
                .send({ message: "Partial Deliverable not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectGrades: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided" });
    }

    ProjectDb.findByPk(id, {
      include: [{ model: GradeDb, as: "Grade" }],
    })
      .then((project) => {
        if (project) {
          res.status(200).send(project);
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectFinalGrade: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided" });
    }

    ProjectDb.findByPk(id)
      .then((project) => {
        if (project) {
          GradeDb.findAll({
            where: {
              projectId: id,
            },
          }).then((grades) => {
            if (grades) {
              let arrayNote = [];
              grades.map((nota) => arrayNote.push(nota.grade));
              let indexValMax = arrayNote.indexOf(Math.max(...arrayNote));
              arrayNote.splice(indexValMax, 1);
              let indexValMin = arrayNote.indexOf(Math.min(...arrayNote));
              arrayNote.splice(indexValMin, 1);

              const finalGrade =
                arrayNote.reduce((a, b) => a + b, 0) / arrayNote.length;

              res.status(200).send({ notaFinala: finalGrade });
            }
          });
        } else {
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
