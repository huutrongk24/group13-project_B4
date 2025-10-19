//backend/controllers/userController.js
let users = [
  { id: 1, name: "A", email: "a@example.com" },
  { id: 2, name: "B", email: "b@example.com" }
];
let nextId = 3;

exports.getUsers = (req, res) => {
  res.json(users);
};

exports.createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ message: "Name and email required" });
  const newUser = { id: nextId++, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
};