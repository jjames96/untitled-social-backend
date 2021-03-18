import { getRepository } from "typeorm";
import { Request } from "express";
import { argon2id, hash, verify } from "argon2";
import User from "../entity/User";
import { getTokenForUser } from "../util/UserTokenHelper";

export default class UserController {
  private userRepository = getRepository(User);

  async register(request: Request) {
    if (
      !request.body.username ||
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.password ||
      !request.body.confirmPassword
    ) {
      // TODO: Missing fields, throw error
      return {};
    }

    if (
      request.body.password !== request.body.confirmPassword ||
      request.body.password.length < 3
    ) {
      // TODO: Passwords are invalid, throw error
      return {};
    }

    const hashedPassword = await hash(request.body.password, {
      type: argon2id,
    });
    const { username } = request.body;
    const userToSave = {
      username,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hashedPassword,
    };
    const savedUser = await this.userRepository.save(userToSave);
    const token = getTokenForUser(savedUser);

    return { username, token };
  }

  async login(request: Request) {
    const user = await this.userRepository.findOneOrFail({
      username: request.body.username,
    });
    const passwordIsCorrect = await verify(
      user.password,
      request.body.password
    );

    if (!passwordIsCorrect) {
      // TODO: Password was not correct, throw error
      return {};
    }

    const { username } = user;
    const token = getTokenForUser(user);

    return { username, token };
  }
}
