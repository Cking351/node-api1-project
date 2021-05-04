// BUILD YOUR SERVER HERE
const { json } = require("express");
const express = require("express");
const server = express();
const User = require("./users/model.js");

// use
server.use(express.json());

// GET USERS
server.get("/users", async (req, res) => {
	const result = await User.find();

	if (!result) {
		res.status(500).json({ message: "There are no user in the database.." });
	} else {
		try {
			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	}
});

// GET USER BY ID
server.get("/users/:id", (req, res) => {
	const id = req.params.id;
	User.findById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => res.status(404).json({ message: error.message }));
});

// DELETE USER BY ID
server.delete("/users/:id", (req, res) => {
	const id = req.params.id;
	if (!id) {
		res.status(500).json({ message: "Please enter a valid ID" });
	} else {
		User.remove(id)
			.then((user) => {
				res.status(200).json(user);
			})
			.catch((error) => res.status(400).json({ message: error.message }));
	}
});

// POST USER
server.post("/users", (req, res) => {
	const newUser = req.body;
	if (!newUser.name || !newUser.bio) {
		res.status(422).json({ message: "Name and bio required" });
	} else {
		User.insert(newUser)
			.then((user) => res.status(201).json(user))
			.catch((error) => res.status(500).json({ message: error.message }));
	}
});

// PUT USER
server.put("/users/:id", (req, res) => {
	const id = req.params.id;
	const changes = req.body;

	User.update(id, changes)
		.then((user) => {
			res.status(201).json(user);
		})
		.catch((error) => res.status(404).json({ message: error.message }));
});

// BOTTOM OF FILE
server.use("/", (req, res) => {
	res.status(404).json({ message: "Resouce not found in this server.." });
});

module.exports = server;
