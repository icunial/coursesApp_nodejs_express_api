const express = require("express");
const codingRouter = express.Router();

const courses = require("../courses");

codingRouter.get("/", (req, res) => {
  res.json(courses.coding);
});

codingRouter.get("/:lang", (req, res) => {
  const lang = req.params.lang;
  const results = courses.coding.filter((course) => course.language === lang);

  if (results.length === 0) {
    return res.status(404).send(`Courses about ${lang} not found!`);
  }

  if (req.query.order === "views") {
    return res.json(
      results.sort((a, b) => {
        return a.views - b.views;
      })
    );
  }

  res.json(results);
});

codingRouter.get("/:lang/:level", (req, res) => {
  const lang = req.params.lang;
  const level = req.params.level;

  const results = courses.coding.filter(
    (course) => course.language === lang && course.level === level
  );

  if (results.length === 0) {
    return res
      .status(404)
      .send(`Courses about ${lang} and level ${level} not found!`);
  }

  res.json(results);
});

codingRouter.post("/", (req, res) => {
  const newCourse = req.body;
  courses.coding.push(newCourse);
  res.json(courses.coding);
});

codingRouter.put("/:id", (req, res) => {
  const updatedCourse = req.body;
  const id = req.params.id;

  const index = courses.coding.findIndex((course) => {
    return course.id === parseInt(id);
  });

  if (index >= 0) {
    courses.coding[index] = updatedCourse;
    return res.json(updatedCourse);
  } else {
    return res.status(404).json(`Course with id: ${id} not found!`);
  }
});

codingRouter.patch("/:id", (req, res) => {
  const updatedInfo = req.body;
  const id = req.params.id;

  const index = courses.coding.findIndex((course) => {
    return course.id === parseInt(id);
  });

  if (index >= 0) {
    const courseToUpdate = courses.coding[index];

    Object.assign(courseToUpdate, updatedInfo);

    return res.json(courseToUpdate);
  } else {
    return res.status(404).json(`Course with id: ${id} not found!`);
  }
});

codingRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  const index = courses.coding.findIndex((course) => {
    return course.id === parseInt(id);
  });

  if (index >= 0) {
    courses.coding.splice(index, 1);
    return res.status(200).json(courses.coding);
  } else {
    return res.status(404).json(`Course with id: ${id} not found!`);
  }
});

module.exports = codingRouter;
