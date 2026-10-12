const { estNonVide, estEmailValide } = require('../utils/validators');

// Base de données fictive des utilisateurs
let users = [
  { id: 1, name: "Alice Dupont", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Martin", email: "bob@example.com", role: "user" }
];

// Récupérer tous les utilisateurs
const getAllUsers = (req, res) => {
  const { role } = req.query;
  if (role) {
    const filteredUsers = users.filter(u => u.role.toLowerCase() === role.toLowerCase());
    return res.status(200).json(filteredUsers);
  }
  res.status(200).json(users);
};

// Récupérer un utilisateur par son ID
const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: `Utilisateur ${id} introuvable` });
  }
  res.status(200).json(user);
};

// Créer un nouvel utilisateur avec validation
const createUser = (req, res) => {
  const { name, email, role } = req.body;

  // Validation à l'aide du module utils/validators.js
  if (!estNonVide(name)) {
    return res.status(400).json({ error: "Le nom est obligatoire et ne doit pas être vide." });
  }

  if (!estEmailValide(email)) {
    return res.status(400).json({ error: "L'adresse email est invalide (doit contenir '@' et '.')." });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    name: name.trim(),
    email: email.trim(),
    role: role || "user"
  };

  users.push(newUser);
  res.status(201).json({ message: "Utilisateur créé avec succès", user: newUser });
};

// Supprimer un utilisateur
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    return res.status(404).json({ error: `Impossible de supprimer : utilisateur ${id} introuvable` });
  }

  users = users.filter(u => u.id !== id);
  res.status(200).json({ message: `Utilisateur ${id} supprimé avec succès` });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser
};