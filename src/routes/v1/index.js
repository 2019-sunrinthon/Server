import Router from "koa-router";
import userRouter from "./user";
import authRouter from "./auth";

const router = new Router({
  prefix: "/v1"
});

router.use("/user", userRouter.routes());
router.use("/auth", authRouter.routes());
export default router;
