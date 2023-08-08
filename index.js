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

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
