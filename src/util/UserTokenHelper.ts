import * as jwt from "jsonwebtoken";
import User from "../entity/User";

export const getTokenForUser = (user: User): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 365, // Expires in a year
  });
};

export const getUserIdFromToken = (token: string): string => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY).id;
};
