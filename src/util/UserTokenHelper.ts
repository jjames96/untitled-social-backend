import * as jwt from "jsonwebtoken";
import User from "../entity/User";

// TODO: Add key to .env
const getTokenForUser = (user: User): string => {
  return jwt.sign({ id: user.id }, "INSECURE_SECRET_KEY", {
    expiresIn: 60 * 60 * 24 * 365, // Expires in a year
  });
};

export default getTokenForUser;
