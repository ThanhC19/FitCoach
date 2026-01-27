import bcrypt from "bcrypt";
import { User } from "../db.js";

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
