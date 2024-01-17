const express = require("express");
const router = express.Router();
const teacherController = require("../controllers").teacher;

router.get("/", teacherController.getAllTeachers);
router.get("/:id", teacherController.getTeacherById);

router.post("/", teacherController.addTeacher);
router.post("/login", teacherController.teacherLogin);

router.put("/:id", teacherController.updateTeacherById);

router.delete("/:id", teacherController.deleteTeacherById);

module.exports = router;
