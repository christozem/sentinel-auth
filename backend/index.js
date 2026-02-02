const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

const users = []; // fake database

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 4); // intentionally weak
  users.push({ username, password: hashed, role: "user" });
  res.json({ message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: "No user" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign(
    { username: user.username, role: user.role,
        isAdmin: true // intentional mistake
     },
    "secret123", // intentionally bad
    { expiresIn: "30d" } // way to long
  );

  res.json({ token });
});

app.get("/profile", (req, res) => {
  res.json({ message: "This is your profile" });
});
app.get("/admin", (req, res) => {
  res.json({
    secretData: "Admin dashboard data",
    message: "Welcome admin"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
