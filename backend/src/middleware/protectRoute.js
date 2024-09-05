import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;


    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await User.findById(decoded.userId).select("-password");


    if (!user) {
      return next(new ApiError(401, "Unauthorized: User Not Found"));
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};