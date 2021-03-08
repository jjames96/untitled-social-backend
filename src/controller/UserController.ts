import { getRepository } from "typeorm";
import { Request } from "express";
import { argon2id, hash, verify } from "argon2";
import User from "../entity/User";
import getTokenForUser from "../util/UserTokenHelper";

export default class UserController {
  private userRepository = getRepository(User);

  async register(request: Request) {
    const hashedPassword = await hash(request.body.password, {
      type: argon2id,
    });
    const userToSave = {
      username: request.body.username,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      password: hashedPassword,
    };
    const savedUser = await this.userRepository.save(userToSave);
    const token = getTokenForUser(savedUser);

    return { token };
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

    const token = getTokenForUser(user);

    return { token };
  }
}
