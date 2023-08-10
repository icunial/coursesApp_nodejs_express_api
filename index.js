const express = require("express");
const app = express();

const courses = require("./courses");

const mathRouter = require("./routers/math");
const codingRouter = require("./routers/coding");

// Middleware -> Body Parser
app.use(express.json());

//Routers

app.use("/api/courses/coding", codingRouter);
app.use("/api/courses/math", mathRouter);

// Routing

app.get("/", (req, res) => {
  res.send("CoursesApp");
});

// Gets all courses
app.get("/api/courses", (req, res) => {
  if (courses.length === 0) {
    return res.status(404).json({
      statusCode: 404,
      msg: `Courses not found!`,
    });
  }
  res.status(200).json({ statusCode: 200, data: courses });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
