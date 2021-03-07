import { getRepository } from "typeorm";
import { Request } from "express";
import User from "../entity/User";
import getTokenForUser from "../util/UserTokenHelper";

export default class UserController {
  private userRepository = getRepository(User);

  async register(request: Request) {
    // TODO: Hash password!
    const user = await this.userRepository.save(request.body);
    const token = getTokenForUser(user);

    return { token };
  }

  async login(request: Request) {
    const user = await this.userRepository.findOneOrFail({
      username: request.body.username,
      password: request.body.password,
    });
    const token = getTokenForUser(user);

    // TODO: Return jwt
    return { token };
  }
}
