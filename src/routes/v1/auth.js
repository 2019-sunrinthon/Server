import Router from "koa-router";
import { throwNoRequiredItems, throwError, code } from "../../lib/errors";
import { makeToken } from "../../lib/auth";
import User from "../../models/User";

const router = new Router();

router.post("/token", async ctx => {
  const { provider } = ctx.request.body;
  throwNoRequiredItems(ctx.throw, ctx.request.body, "provider");

  if (provider !== "local" && provider !== "kakao") {
    return ctx.throw(...throwError(code.NOT_DEFIND_ENUM));
  }

  if (provider === "local") {
    const { username, password } = ctx.request.body;

    const user = await User.findOne({ username, password });
    if (!user || !user.verifyPassword(password)) {
      return ctx.throw(...throwError(code.NOT_FOUND));
    }
    const { email, age, phoneNumber, name } = user;
    ctx.status = 201;
    ctx.body = {
      token: makeToken({
        provider: "local",
        username,
        email,
        age,
        phoneNumber,
        name
      })
    };
  } else {
    // 나중에
  }
});
export default router;
