import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/users.model.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let accessToken = req.cookies.jwt;
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(403);
      throw new Error("not authorized, Invalid accessToken");
    }
  } else {
    res.status(403);
    throw new Error("not authorized, no accessToken");
  }
});

export { protect };
