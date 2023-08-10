const express = require("express");
const mathRouter = express.Router();

const courses = require("../courses");

// Gets all math courses
mathRouter.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    data: courses.mathmatics,
  });
});

// Gets all math courses filterd by topic
mathRouter.get("/:topic", (req, res) => {
  const topic = req.params.topic;
  const results = courses.mathmatics.filter((course) => course.topic === topic);

  if (results.length === 0) {
    return res.status(404).json({
      statusCode: 404,
      msg: `Courses about ${topic} not found!`,
    });
  }

  res.status(200).json({
    statusCode: 200,
    data: results,
  });
});

// Create a new Math Course
mathRouter.post("/", (req, res) => {
  // Validations
  if (!req.body.title || !req.body.topic || !req.body.level) {
    return res.status(400).json({
      statusCode: 400,
      msg: `Title, topic and level properties can not be empty!`,
    });
  }
});

module.exports = mathRouter;
