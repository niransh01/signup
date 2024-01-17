const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('.modelsuser');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodblocalhostyour_database');

app.post('signup', async (req, res) = {
  try {
    const { username, email, password } = req.body;

     Validate input (you may want to add more validation)
    if (!username  !email  !password) {
      return res.status(400).json({ message 'All fields are required.' });
    }

     Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message 'Email already in use.' });
    }

     Hash the password
    const hashedPassword = hashPasswordFunction(password);

     Create a new user
    const newUser = new User({
      username,
      email,
      password hashedPassword,
    });

     Save the user to the database
    await newUser.save();

    return res.status(201).json({ message 'User created successfully.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message 'Internal server error.' });
  }
});

const port = 3000;
app.listen(port, () = {
  console.log(`Server is running on port ${port}`);
});
