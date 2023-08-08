const express = require("express");
const app = express();

const courses = require("./courses");

//Routers

const codingRouter = express.Router();
const mathRouter = express.Router();
app.use("/api/courses/coding", codingRouter);
app.use("/api/courses/math", mathRouter);

// Routing

app.get("/", (req, res) => {
  res.send("CoursesApp");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
