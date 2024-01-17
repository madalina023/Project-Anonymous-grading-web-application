const student = require("./student");
const teacher = require("./teacher");
const project = require("./project");
const partialDeliverable = require("./partialDeliverable");
const grade = require("./grade");

const controllers = {
  student,
  teacher,
  project,
  partialDeliverable,
  grade,
};

module.exports = controllers;
