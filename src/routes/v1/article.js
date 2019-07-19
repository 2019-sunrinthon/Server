import Router from "koa-router";
import { authMiddleware } from "../../lib/auth";
import Article from "../../models/Article";
import { throwNoRequiredItems } from "../../lib/errors";

const router = new Router();

router.post("/", authMiddleware, async ctx => {
  const { _id } = ctx.state.user;
  throwNoRequiredItems(ctx.throw, ctx.request.body, "title", "contents");
  const { title, contents } = ctx.request.body;

  const article = new Article({ title, contents, by: _id });
  await article.save();

  ctx.status = 201;
  ctx.body = { id: article._id };
});

router.get("/", authMiddleware, async ctx => {
  const { age } = ctx.state.user;
  const nAge = Math.floor(age / 10) * 10;

  let data = await Article.find()
    .populate({
      path: "by",
      select: "age",
      match: { age: { $gte: nAge, $lt: nAge + 10 } }
    })
    .exec();
  data = data.filter(d => {
    return d.by;
  });
  data = data.sort(() => {
    return Math.floor(Math.random() * 3) - 1;
  });
  ctx.body = {
    articles: data
  };
});
export default router;
