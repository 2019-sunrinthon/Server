import Router from "koa-router";
import User from "../../models/User";
import {
  throwNoRequiredItems,
  isUniqueError,
  throwError,
  code
} from "../../lib/errors";

const router = new Router();

router.post("/", async ctx => {
  const {
    username,
    password,
    email,
    name,
    phoneNumber,
    age
  } = ctx.request.body;

  throwNoRequiredItems(
    ctx.throw,
    ctx.request.body,
    "username",
    "password",
    "email",
    "phoneNumber",
    "age"
  );
  const user = new User({
    username,
    password,
    email,
    name,
    phoneNumber,
    age
  });

  try {
    await user.save();
  } catch (e) {
    console.error(e);
    if (isUniqueError(e)) {
      ctx.throw(...throwError(code.UNIQUE_ERROR));
    } else {
      throw e;
    }
  }
  ctx.status = 201;
  ctx.body = {
    username,
    email,
    name,
    phoneNumber,
    age
  };
});

export default router;
