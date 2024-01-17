const express = require("express");
const router = express.Router();
const studentController = require("../controllers").student;

router.get("/", studentController.getAllStudents);

router.get("/:id", studentController.getStudentById);
router.get("/:id/projects", studentController.getProjectsFromStudent);
router.get("/:sid/projects/:pid", studentController.getProjectByIdFromStudent);

router.post("/login", studentController.studentLogin);
router.post("/", studentController.addStudent);
router.post("/:id/projects", studentController.addProjectToStudent);

router.put("/:id", studentController.updateStudentById);
router.put("/:sid/projects/:pid", studentController.updateProjectToStudent);

router.delete("/:id", studentController.deleteStudentById);
router.delete("/:sid/projects/:pid", studentController.deleteProjectToStudent);

module.exports = router;
