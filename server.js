const express = require("express"); // Import express
const app = express();
const PORT = 8080; // Ganti port ke 8080 supaya beda dengan default

// Middleware to parse JSON
app.use(express.json());

// Mock data dengan 5 mapping sesuai API Harry Potter
let groups = [
  {
    group_name: "Gryffindor", // Ganti nama group jadi lebih sesuai dengan API Harry Potter
    students: [
      {
        name: "Harry Potter",
        id: "1",
        class: "Gryffindor",
        blood_status: "Half-blood",
        wand: "Holly, 11\", Phoenix feather core",
      },
      {
        name: "Hermione Granger",
        id: "2",
        class: "Gryffindor",
        blood_status: "Muggle-born",
        wand: "Vine wood, 10¾\", Dragon heartstring core",
      },
      {
        name: "Ron Weasley",
        id: "3",
        class: "Gryffindor",
        blood_status: "Pure-blood",
        wand: "Willow, 14\", Unicorn hair core",
      },
      {
        name: "Draco Malfoy",
        id: "4",
        class: "Slytherin",
        blood_status: "Pure-blood",
        wand: "Hawthorn, 10\", Unicorn hair core",
      },
      {
        name: "Fred Weasley",
        id: "5",
        class: "Gryffindor",
        blood_status: "Pure-blood",
        wand: "Ash, 13\", Dragon heartstring core",
      },
    ],
  },
];

// Routes

// Get all groups
app.get("/groups", (req, res) => {
  res.json(groups);
});

// Get a specific group by name
app.get("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });
  res.json(group);
});

// Add a new group
app.post("/groups", (req, res) => {
  const { group_name, students } = req.body;

  if (!group_name || !Array.isArray(students)) {
    return res
      .status(400)
      .json({ error: "Group name and a list of students are required" });
  }

  const newGroup = { group_name, students };
  groups.push(newGroup);
  res.status(201).json(newGroup);
});

// Add a student to a specific group
app.post("/groups/:group_name/students", (req, res) => {
  const groupName = req.params.group_name;
  const { name, id, class: studentClass, blood_status, wand } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (!name || !id || !studentClass || !blood_status || !wand) {
    return res.status(400).json({
      error: "Student name, id, class, blood status, and wand are required",
    });
  }

  const newStudent = { name, id, class: studentClass, blood_status, wand };
  group.students.push(newStudent);
  res.status(201).json(group);
});

// Update a group by name
app.put("/groups/:group_name", (req, res) => {
  const groupName = req.params.group_name;
  const { group_name, students } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  if (group_name) group.group_name = group_name;
  if (students && Array.isArray(students)) group.students = students;

  res.status(200).json(group);
});

// Update a student in a specific group
app.put("/groups/:group_name/students/:id"), (req, res) => {
  const groupName = req.params.group_name;
  const studentId = req.params.id;
  const { name, id, class: studentClass, blood_status, wand } = req.body;

  const group = groups.find((g) => g.group_name === groupName);
  if (!group) return res.status(404).json({ error: "Group not found" });

  const student = group.students.find((s) => s.id === studentId);
  if (!student) return res.status(404).json({ error: "Student not found" });

  if (name) student.name = name;
  if (id) student.id = id;
  if (studentClass) student.class = studentClass;

}