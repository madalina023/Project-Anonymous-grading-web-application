const express = require("express");
const router = express.Router();

const studentRouter = require("./student");
const teacherRouter = require("./teacher");
const projectRouter = require("./project");
const partialDeliverableRouter = require("./partialDeliverable");
const gradeRouter = require("./grade");

router.use("/students", studentRouter);
router.use("/teachers", teacherRouter);
router.use("/projects", projectRouter);
router.use("/partialDeliverables", partialDeliverableRouter);
router.use("/grades", gradeRouter);

module.exports = router;
