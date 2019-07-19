import Router from "koa-router";
import userRouter from "./user";
import authRouter from "./auth";
import articleRouter from "./article";

const router = new Router({
  prefix: "/v1"
});

router.use("/user", userRouter.routes());
router.use("/auth", authRouter.routes());
router.use("/article", articleRouter.routes());

export default router;
