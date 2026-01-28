import bcrypt from 'bcrypt';
import { User } from '../db.js';

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // check that both fields are filled in:
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password required' });
    }

    // check if the username is already used:
    const existingUser = await User.findOne({ where: { username: username } });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // hash password:
    const hash = await bcrypt.hash(password, 10);

    // create user:
    const newUser = await User.create({
      username: username,
      password: hash,
    })

    //remove the hashed data from return value:
    const returnedUserData = newUser.toJSON();
    delete returnedUserData.password;

    //return res:
    return res.status(201).json(returnedUserData);

    // catch error:
  } catch (err) {
    console.error('registerUser error:', err);
    return res.status(500).json({ message: 'Failed to create new user' });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username: username },
    });
    const validatedPass = await bcrypt.compare(password, user.password);
    if (!validatedPass) throw new Error();
    // TODO Session isn't initialized yet, so this will throw an error.
    //req.session.uid = user.UID;
    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .send({ error: "401", message: "Username or password is incorrect" });
  }
};
