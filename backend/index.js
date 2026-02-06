const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // only 5 login attempts allowed
  message: { error: "Too many login attempts. Try again later." }
});

const app = express();
app.use(express.json());

const users = []; // fake database
function logSecurityEvent(message) {
  console.log("[SECURITY]", new Date().toISOString(), message);
}

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 4); // intentionally weak
  users.push({ username, password: hashed, role: "user" });
  res.json({ message: "User registered" });
});

app.post("/login", loginLimiter, async (req, res) => {
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


function verifyToken(req, res, next) {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secret123");
    req.user = decoded;
    next();
  } catch (err) {
  logSecurityEvent("Invalid token used");
  return res.status(401).json({ error: "Invalid token" });
}

}

app.get("/profile", (req, res) => {
  res.json({ message: "This is your profile" });
});
app.get("/admin", verifyToken, (req, res) => {
  const user = users.find(
    u => u.username === req.user.username
  );

  if (!user || user.role !== "admin") {
  logSecurityEvent(
    `Unauthorized admin access attempt by ${req.user.username}`
  );
  return res.status(403).json({ error: "Admins only" });
}
logSecurityEvent(`Admin access granted to ${user.username}`);

  res.json({
    secretData: "Admin dashboard data",
    message: "Welcome admin"
  });
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
