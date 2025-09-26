const User = require("../modal/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name) {
    return res.status(400).json({ message: "name not found" });
  }
  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "email not found" });
  }
  try {
    const user = await User.find({ email: email });

    if (user.length) {
      return res.status(400).json({ message: "email is already present" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);

  // const newUser = await User.create({
  //   name: name,
  //   email: email,
  //   password: hashpassword,
  // });

  const newUser = new User({
    name: name,
    email: email,
    password: hashpassword,
  });

  await newUser.save();

  res.status(200).json({ message: "successfull" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "email not found" });
  }
  if (!password) {
    return res.status(400).json({ message: "password not found" });
  }
  try {
    var user = await User.find({ email: email });

    if (user.length == 0) {
      return res.status(400).json({ message: "email is not present" });
    }
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
  const passwordCheck = await bcrypt.compare(password, user[0].password);

  if (passwordCheck == 0) {
    return res.status(400).json({ message: "incorrect Password" });
  }

  const token = jwt.sign(user[0].id, process.sign.SECRET_KEY);

  return res.status(200).json({ message: "Login Successfully", token: token });
};

module.exports = {
  register,
  login,
};
