const express = require("express");
const router = express.Router();
const projectController = require("../controllers").project;

router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.get(
  "/:id/partialDeliverables",
  projectController.getPartialDeliverablesFromProject
);
router.get(
  "/:pid/partialDeliverables/:lid",
  projectController.getPartialDeliverableByIdFromProject
);
router.get("/:id/grades", projectController.getProjectGrades);
router.get("/:id/finalGrade", projectController.getProjectFinalGrade);

router.post("/", projectController.addProject);
router.post(
  "/:id/partialDeliverables",
  projectController.addPartialDeliverableToProject
);

router.put("/:id", projectController.updateProjectById);
router.put(
  "/:pid/partialDeliverables/:lid",
  projectController.updatePartialDeliverablesToProject
);

router.delete("/:id", projectController.deleteProjectById);
router.delete(
  "/:pid/partialDeliverables/:lid",
  projectController.deletePartialDeliverablesToProject
);

module.exports = router;
