import PostController from "./controller/PostController";
import UserController from "./controller/UserController";

const Routes = [
  {
    method: "post",
    route: "/v1/auth/register",
    controller: UserController,
    action: "register",
  },
  {
    method: "post",
    route: "/v1/auth/login",
    controller: UserController,
    action: "login",
  },
  {
    method: "post",
    route: "/v1/posts",
    controller: PostController,
    action: "create",
  },
  {
    method: "get",
    route: "/v1/posts",
    controller: PostController,
    action: "allForUser",
  },
  {
    method: "delete",
    route: "/v1/posts/:id",
    controller: PostController,
    action: "delete",
  },
];

export default Routes;
