import * as jwt from "jsonwebtoken";
import User from "../entity/User";

const getTokenForUser = (user: User): string => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 365, // Expires in a year
  });
};

export default getTokenForUser;
