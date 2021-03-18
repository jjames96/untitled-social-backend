import { getRepository } from "typeorm";
import { Request } from "express";
import Post from "../entity/Post";
import User from "../entity/User";
import { getUserIdFromToken } from "../util/UserTokenHelper";

export default class PostController {
  private postRepository = getRepository(Post);

  private userRepository = getRepository(User);

  async create(request: Request) {
    if (!request.body.text) {
      // TODO: Missing fields, throw error
      return {};
    }

    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      // TODO: Unauthorized, throw error
      return {};
    }

    const userId = getUserIdFromToken(token);
    const postedBy = await this.userRepository.findOneOrFail({ id: userId });
    const { text } = request.body;

    const postToSave = {
      postedBy,
      text,
      postedAt: Date.now(),
    };

    await this.postRepository.save(postToSave);

    return {};
  }

  async delete(request: Request) {
    if (!request.params.id) {
      // TODO: Missing fields, throw error
      return {};
    }

    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      // TODO: Unauthorized, throw error
      return {};
    }

    const userId = getUserIdFromToken(token);
    const postedBy = await this.userRepository.findOneOrFail({ id: userId });
    const { id } = request.params;

    const postToUpdate = await this.postRepository.findOneOrFail({
      id,
      postedBy,
    });
    postToUpdate.isDeleted = true;
    await this.postRepository.save(postToUpdate);

    return {};
  }

  async allForUser(request: Request) {
    const token = request.headers.authorization.split(" ")[1];

    if (!token) {
      // TODO: Unauthorized, throw error
      return {};
    }

    const userId = getUserIdFromToken(token);

    return this.postRepository
      .createQueryBuilder("post")
      .select([
        "post",
        "postedBy.username",
        "postedBy.firstName",
        "postedBy.lastName",
      ])
      .innerJoin("post.postedBy", "postedBy")
      .where("postedBy.id = :userId", { userId })
      .orderBy("postedAt", "DESC")
      .getMany();
  }
}
