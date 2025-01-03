// USER CONTROLLERS FOR LOGIN AND SIGNUP.
import User from "../Models/UserModel.js";
import generateToken from "../config/generateToken.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(403).json({ message: "Required fields are missing!" });

  const existuser = await User.findOne({ email });

  if (existuser && existuser.matchPassword(password)) {
    return res.status(200).json({
      _id: existuser._id,
      name: existuser.name,
      email: existuser.email,
      profilePic: existuser.profilePic,
      token: generateToken(existuser._id),
    });
  } else {
    res.status(400).json({ message: "Invalid Email ID or Password" });
  }
};

const signUp = async (req, res) => {

  //Required fields for User model
  const userData = req.body;
  if (
    !userData.name ||
    !userData.email ||
    !userData.department ||
    !userData.password||
    !userData.gender
  )
    return res.status(403).json({ message: "Required fields are missing!" });


  //Check whether user exists or not.
  const existUser = await User.findOne({ email: userData.email });
  if (existUser)
    return res.status(400).json({ message: "User already exists!" });
  

  const user = new User(userData);
  await user.save();

  return res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePic: user.profilePic,
    token: generateToken(user._id),
  });
};

export { login, signUp };
