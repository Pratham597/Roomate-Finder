import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const auth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      return next();
    } catch (error) {
      throw new Error(error);
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
};

export default auth;
