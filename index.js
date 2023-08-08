const express = require("express");
const app = express();

const courses = require("./courses");

// Routing

app.get("/", (req, res) => {
  res.send("CoursesApp");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/courses/coding", (req, res) => {
  res.json(courses.coding);
});

app.get("/api/courses/coding/:lang", (req, res) => {
  const lang = req.params.lang;
  const results = courses.coding.filter((course) => course.language === lang);

  if (results.length === 0) {
    return res.status(404).send(`Courses about ${lang} not found!`);
  }

  res.json(results);
});

app.get("/api/courses/math", (req, res) => {
  res.json(courses.mathmatics);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
