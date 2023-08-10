const express = require("express");
const codingRouter = express.Router();

const courses = require("../courses");

// Gets all coding courses
codingRouter.get("/", (req, res) => {
  res.status(200).json({
    statusCode: 200,
    data: courses.coding,
  });
});

// Gets all coding courses filtered by language
codingRouter.get("/:lang", (req, res) => {
  const lang = req.params.lang;
  const results = courses.coding.filter((course) => course.language === lang);

  if (results.length === 0) {
    return res.status(404).json({
      statusCode: 404,
      msg: `Courses about ${lang} not found!`,
    });
  }

  if (req.query.order === "views") {
    return res.json(
      results.sort((a, b) => {
        return a.views - b.views;
      })
    );
  }

  res.status(200).json({ statusCode: 200, data: results });
});

// Gets all coding courses filtered by language and level
codingRouter.get("/:lang/:level", (req, res) => {
  const lang = req.params.lang;
  const level = req.params.level;

  const results = courses.coding.filter(
    (course) => course.language === lang && course.level === level
  );

  if (results.length === 0) {
    return res.status(404).json({
      statusCode: 404,
      msg: `Courses about ${lang} and level ${level} not found!`,
    });
  }

  res.status(200).json({ statusCode: 200, data: results });
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
    // return res.status(404).end()
    // return res.status(204).json(`Course with id: ${id} not found!`);
    // 204 -> no content
  }
});

module.exports = codingRouter;
