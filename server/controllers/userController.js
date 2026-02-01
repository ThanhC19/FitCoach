import bcrypt from 'bcrypt';
import { User } from '../db.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check that both fields are filled in:
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    const usernameTrimmed = username.trim();

    // check that the username is at least 5 characters long
    if (usernameTrimmed.length < 5) {
      return res.status(400).json({ message: 'Username needs to be at least 5 characters long.' });
    }

    // check that the password contains at least 1 letter and 1 special character
    const pattern = /^(?=.*[A-Za-z])(?=.*[^A-Za-z0-9]).+$/;
    if (!pattern.test(password)) {
      return res.status(400).json({ message: 'Password needs to contain at least one letter and one special character.' });
    }

    // check if the username is already used:
    const existingUser = await User.findOne({ where: { username: usernameTrimmed } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // hash password:
    const hash = await bcrypt.hash(password, 10);

    // create user:
    const newUser = await User.create({
      username: usernameTrimmed,
      password: hash,
    });

    // remove the hashed data from return value:
    const returnedUserData = newUser.toJSON();
    delete returnedUserData.password;

    // return res:
    return res.status(201).json(returnedUserData);
  } catch (err) {
    console.error('registerUser error:', err);
    return res.status(500).json({ message: 'Failed to create new user' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check that both fields are filled in:
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password required" });
    }

    const user = await User.findOne({
      where: { username: username },
    });

    // check if the username exist on the DB
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // check if the provided password matches the stored hash
    const validatedPass = await bcrypt.compare(password, user.password);

    // if the password doesn't match, throw an error
    if (!validatedPass)
      return res.status(401).json({ message: "Invalid credentials" });

    // TODO Session isn't initialized yet, so this will throw an error.
    //req.session.uid = user.UID;
    res.status(200).send(user.username);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "500", message: "Username or password is incorrect" });
  }
};
