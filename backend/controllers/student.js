const StudentDb = require("../models").Student;
const TeacherDb = require("../models").Teacher;
const ProjectDb = require("../models").Project;
const PartialDeliverableDb = require("../models").PartialDeliverable;
const GradeDb = require("../models").Grade;

const controller = {
  getAllStudents: async (req, res) => {
    StudentDb.findAll()
      .then((students) => {
        res.status(200).send(students);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addStudent: async (req, res) => {
    let errors = [];
    if (
      !req.body.nume ||
      !req.body.prenume ||
      !req.body.email ||
      !req.body.parola
    ) {
      errors.push("empty fields detected");
    } else if (
      !req.body.email.match(
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
      )
    ) {
      errors.push("invalid email");
    }

    if (errors.length === 0) {
      StudentDb.create({
        nume: req.body.nume,
        prenume: req.body.prenume,
        email: req.body.email,
        parola: req.body.parola,
      })
        .then((student) => {
          res.status(201).send(student);
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error!" });
        });
    } else {
      console.log("Error");
      res.status(400).send(errors);
    }
  },

  getStudentById: async (req, res) => {
    StudentDb.findByPk(req.params.id)
      .then((student) => {
        if (student) {
          res.status(201).send(student);
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  studentLogin: async (req, res) => {
    StudentDb.findOne({
      where: {
        email: req.body.email,
        parola: req.body.parola,
      },
    })
      .then((student) => {
        if (student) {
          res.status(200).send(student);
        } else {
          res.status(200).send({ message: "user does not exist!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateStudentById: async (req, res) => {
    let errors = [];
    if (
      !req.body.nume ||
      !req.body.prenume ||
      !req.body.email ||
      !req.body.parola
    ) {
      errors.push("empty fields detected");
    } else if (
      !req.body.email.match(
        "(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"
      )
    ) {
      errors.push("invalid email");
    }
    if (errors.length === 0) {
      StudentDb.findByPk(req.params.id)
        .then((student) => {
          if (student) {
            student.update(req.body);
            res.status(202).send(student);
          } else {
            res.status(404).send({ message: "Student not found!" });
          }
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send({ message: "Server error!" });
        });
    } else {
      console.log("Error");
      res.status(400).send(errors);
    }
  },

  deleteStudentById: async (req, res) => {
    StudentDb.findByPk(req.params.id)
      .then((student) => {
        if (student) {
          student.destroy();
          res.status(202).send({ message: "deleted" });
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectsFromStudent: async (req, res) => {
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "ID not provided" });
    }

    StudentDb.findByPk(id, {
      include: [{ model: ProjectDb, as: "Project" }],
    })
      .then((student) => {
        if (student) {
          res.status(200).send(student);
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  getProjectByIdFromStudent: async (req, res) => {
    const { sid, pid } = req.params;
    if (!sid) {
      res.status(400).send({ message: "Student ID not provided" });
    }
    if (!pid) {
      res.status(400).send({ message: "Project ID not provided" });
    }

    StudentDb.findByPk(sid)
      .then((student) => {
        if (student) {
          ProjectDb.findOne({
            where: {
              id: pid,
              studentId: sid,
            },
          }).then((proiect) => {
            if (proiect) {
              res.status(200).send(proiect);
            } else {
              res.status(404).send({ message: "Project not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  addProjectToStudent: async (req, res) => {
    const { titlu } = req.body;
    const { id } = req.params;
    if (!id) {
      res.status(400).send({ message: "Student ID not provided" });
    }

    StudentDb.findByPk(id)
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
          res.status(404).send({ message: "Project not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },

  updateProjectToStudent: async (req, res) => {
    const { titlu } = req.body;
    const { sid, pid } = req.params;
    if (!sid) {
      res.status(400).send({ message: "Student ID not provided" });
    }
    if (!pid) {
      res.status(400).send({ message: "Project ID not provided" });
    }

    StudentDb.findByPk(sid)
      .then((student) => {
        if (student) {
          ProjectDb.findOne({
            where: {
              id: pid,
              studentId: sid,
            },
          }).then((project) => {
            if (project) {
              if (titlu) {
                project.update(req.body);
                res.status(202).send(project);
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

  deleteProjectToStudent: async (req, res) => {
    const { sid, pid } = req.params;
    if (!sid) {
      res.status(400).send({ message: "Student ID not provided" });
    }
    if (!pid) {
      res.status(400).send({ message: "Project ID not provided" });
    }

    StudentDb.findByPk(sid)
      .then((student) => {
        if (student) {
          ProjectDb.findOne({
            where: {
              id: pid,
              studentId: sid,
            },
          }).then((project) => {
            if (project) {
              project.destroy();
              res.status(202).send({ message: "deleted" });
            } else {
              res.status(404).send({ message: "Project not found!" });
            }
          });
        } else {
          res.status(404).send({ message: "Student not found!" });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).send({ message: "Server error!" });
      });
  },
};

module.exports = controller;
