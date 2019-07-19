import Router from "koa-router";
import userRouter from "./user";
const router = new Router({
  prefix: "/v1"
});

router.use("/user", userRouter.routes());
export default router;
