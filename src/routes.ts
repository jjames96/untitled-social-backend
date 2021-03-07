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
];

export default Routes;
