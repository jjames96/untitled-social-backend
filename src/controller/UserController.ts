import { getRepository } from "typeorm";
import { Request } from "express";
import User from "../entity/User";

export default class UserController {
  private userRepository = getRepository(User);

  async register(request: Request) {
    // TODO: Hash password!
    return this.userRepository.save(request.body);
  }

  async login(request: Request) {
    const user = await this.userRepository.findOneOrFail({
      username: request.body.username,
      password: request.body.password,
    });

    // TODO: Return jwt
    return { token: user.username };
  }
}
