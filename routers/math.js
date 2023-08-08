const express = require("express");
const mathRouter = express.Router();

const courses = require("../courses");

mathRouter.get("/", (req, res) => {
  res.json(courses.mathmatics);
});

mathRouter.get("/:topic", (req, res) => {
  const topic = req.params.topic;
  const results = courses.mathmatics.filter((course) => course.topic === topic);

  if (results.length === 0) {
    return res.status(404).send(`Courses about ${topic} not found!`);
  }

  res.json(results);
});

module.exports = mathRouter;
