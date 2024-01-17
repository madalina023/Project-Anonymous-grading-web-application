const Sequelize = require("sequelize");
const db = require("../config/db");
// Models
const StudentModel = require("./student");
const TeacherModel = require("./teacher");
const ProjectModel = require("./project");
const PartialDeliverableModel = require("./partialDeliverable");
const GradeModel = require("./grade");

const Student = StudentModel(db, Sequelize);
const Teacher = TeacherModel(db, Sequelize);
const Project = ProjectModel(db, Sequelize);
const PartialDeliverable = PartialDeliverableModel(db, Sequelize);
const Grade = GradeModel(db, Sequelize);

// Relatii tabele
// Teacher.hasMany(Student, {
//   foreignKey: "teacherId",
//   as: "Student",
// });
// Student.belongsTo(Teacher);

Student.hasMany(Project, {
  foreignKey: "studentId",
  as: "Project",
});
Project.belongsTo(Student);

Project.hasMany(PartialDeliverable, {
  foreignKey: "projectId",
  as: "PartialDeliverable",
});
PartialDeliverable.belongsTo(Project);

Project.hasMany(Grade, {
  foreignKey: "projectId",
  as: "Grade",
});
Grade.belongsTo(Project);

module.exports = {
  Student,
  Teacher,
  Project,
  PartialDeliverable,
  Grade,
  connection: db,
};
